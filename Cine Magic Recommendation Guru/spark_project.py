import os
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Integer
import findspark
import pyspark
from pyspark.sql import SparkSession
from pyspark import SparkContext
from pyspark_function import plot_genres, top_movies, top_recommend

findspark.init() 
sc = SparkContext.getOrCreate()
spark = SparkSession.builder.getOrCreate()

spark_project = Flask(__name__)
spark_project.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
spark_project.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(spark_project)


class Todo(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Task %r>' % self.id


movies = spark.read.csv("./data/movies.csv", header=True)
ratings = spark.read.csv("./data/ratings.csv", header=True)


@spark_project.route('/', methods=['POST', 'GET'])
def index():
    """
    displays 30 movie IDs, names, and information on web page
    and retrieves movie information and inserts it into the database.
    """
    if request.method == 'POST':
        movie_id = request.form.get('id')
        movie_name = request.form.get('name')
        movie_genre = request.form.get('genre')

        existing_movie = Todo.query.filter_by(id=movie_id).first()
        if existing_movie:
            return redirect('/')

        new_movie = Todo(id=movie_id, name=movie_name, genre=movie_genre)
        try:
            db.session.add(new_movie)
            db.session.commit()
            return redirect('/')
        except:
            return 'Database insert issue'
    else:
        return render_template('index.html', movies=movies)

@spark_project.route('/home.html', methods=['POST', 'GET'])
def home():
    """
    Display two data tables containing information about 
    the top 20 movies and top 19 genres based on user ratings.
    """
    if not os.path.exists('./static/image/plot.png'):
        avg_rating = plot_genres(movies, ratings)
    else:
        avg_rating = 'image/plot.png'
    return render_template('home.html', avg_rating=avg_rating, top_movie=top_movies(movies, ratings))

@spark_project.route('/favorites.html', methods=['POST', 'GET'])
def favorites():
    """
    Retrieve all the movies from the "Todo" table in the database 
    and displays the result on the web page
    """
    movies = Todo.query.order_by(func.cast(Todo.id, Integer)).all()
    return render_template('favorites.html', movies=movies)

@spark_project.route('/recommend.html', methods=['POST', 'GET'])
def recommend():
    """
    generate a list of recommended movies based on 
    the user's preferences and ratings.
    """
    like_movies_model = Todo.query.all()
    if not like_movies_model:
        top_recom = ""
    else:
        top_recom = top_recommend(movies, ratings,like_movies_model)
    return render_template('recommend.html', recommend_list = top_recom)


@spark_project.route('/unlike/<string:id>')
def unlike(id):
    """
    handle requests for unfavoriting or removing a movie from favorites.html
    """
    unlike_movie = Todo.query.get_or_404(id)
    try:
        db.session.delete(unlike_movie)
        db.session.commit()
        return redirect('/favorites.html')
    except:
        return redirect('/favorites.html')


if __name__ == '__main__':
    with spark_project.app_context():
        db.create_all()
    spark_project.run(host='0.0.0.0', port=5000, debug=True)

