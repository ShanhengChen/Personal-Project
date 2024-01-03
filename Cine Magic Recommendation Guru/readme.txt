Project Name: Movie Recommendation System
Author : Shanheng Chen

Description:

This Python project utilizes PySpark, Flask, and SQLAlchemy to provide personalized movie recommendations based on user preferences. The system analyzes movie rating data collected from users and presents popular genres and movies on a web page built with Flask. Users can manage their favorite movies using SQLAlchemy, and the system recommends movies based on their preferences.

Key Technologies:

Programming Languages: Python, HTML, CSS
Data Processing and Analysis: PySpark, Pandas
Web Development: Flask, SQLAlchemy
Data Visualization: Matplotlib
Software Platform: Docker

Features:

Analyzes movie rating data collected from users to identify popular genres and movies.
Allows users to manage their movie collection by providing functionality to delete or modify movies in their favourite movie list.
Generates personalized movie recommendations based on user preferences.

Build Docker Image

1. Clone the repository:

   git clone https://github.com/your-username/cine-magic-recommendation.git
   cd cine-magic-recommendation

2. Build and run the application

docker build -t cine-magic-recommendation-guru .
docker run -p 5000:5000 cine-magic-recommendation-guru





