from pyspark.sql.functions import avg, count, col
import matplotlib.pyplot as plt
import pandas as pd


def plot_genres(movies, ratings):
    """
    Find the top 19 most popular movie genres based on user ratings, 
    then plot the data into a table and generate a plot.png 
    :param line: movies rdd and ratings rdd
    :return: the path to plot.png
    """
    movies_rdd = movies.rdd.map(lambda row: (row['movieId'], row['genres']))
    moviegenres_flat_rdd = movies_rdd.flatMapValues(lambda x: x.split("|"))
    moviegenres = moviegenres_flat_rdd.toDF(["movieId", "genre"])

    moviegenres = moviegenres.withColumn(
        "movieId", moviegenres["movieId"].cast("int"))
    ratings = ratings.withColumn("movieId", ratings["movieId"].cast("int"))
    ratings = ratings.withColumn("rating", ratings["rating"].cast("float"))

    joined_data = moviegenres.join(ratings, "movieId")
    grouped_data = joined_data.groupBy("genre").agg(
        avg("rating").alias("avg_rating"), count("rating").alias("rating_count"))

    filtered_data = grouped_data.filter("rating_count > 50") \
        .orderBy("avg_rating", ascending=True)

    result = filtered_data.select("genre", "avg_rating")
    result_pd = result.toPandas()
    result_pd.head()
    result_pd.plot(kind="barh", y="avg_rating", x="genre")
    plt.subplots_adjust(bottom=0.3)
    plt.legend(loc='lower right')
    plt.title("Top 19 Hottest Movie Genre Ranking")
    plt.savefig("./static/image/plot.png", bbox_inches='tight')
    return "image/plot.png"

def top_movies_filter(movies, ratings):
    """
    Find the average rating for each movie that has more than 50 ratings.
    Sort descending by average rating.
    :param line: movies rdd and ratings rdd
    :return: the average_ratings rdd which contains columns 
    (movieId,vote_count,average_rating,name,genre)
    """
    filtered_ratings = ratings.groupBy("movieId").agg(count("rating").alias("vote_count"),
                                                      avg(col("rating").cast("float")).alias("average_rating")).filter(col("vote_count") > 50)
    average_ratings = filtered_ratings.join(
        movies, "movieId").orderBy("average_rating", ascending=False)
    return average_ratings

def top_movies(movies, ratings):
    """
    Scratch the movieid, title and average_rating of the top 20 movies 
    from the average_ratings rdd
    :param line: movies rdd and ratings rdd
    :return: a list containing the top 20 movies infomation from the dataset.
    """
    result = top_movies_filter(movies, ratings).select("movieId", "title", "average_rating")
    return result.take(20)

def top_recommend(movies, ratings, model):
    """
    Retrieve all records or items from a database table, 
    find the favorite movie types in the user's collection, 
    and recommend 10 movies with the highest ratings 
    that best meet the user's preferences based on the user's favorite genre
    :param line: movies rdd, ratings rdd and Todo data model
    :return:
    """
    movie_recommend = []
    top_two_genre = {}
    # Gain top two genres the user likes
    for ele in model:
        movie_recommend.extend(ele.genre.split("|"))
    for genre in movie_recommend:
        top_two_genre[genre] = top_two_genre.get(genre, 0) + 1
    # Emit ("genre, appear time") in dict and find top two genres
    sorted_genre = sorted(top_two_genre.items(), key=lambda x: x[1], reverse=True)
    top_two_genre_list = [sorted_genre[0][0], sorted_genre[1][0]]
    #search the top 10 rated movies base on users' favourite
    select_movie_rdd = top_movies_filter(movies, ratings) \
    .filter(col("genres").contains(top_two_genre_list[0]) \
        & col("genres").contains(top_two_genre_list[1])).take(10)
    return select_movie_rdd