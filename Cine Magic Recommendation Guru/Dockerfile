# 
FROM python:3.10.2

# setup work dir
WORKDIR /app

# copy sll files into workdir
COPY . .

# install requirments
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y default-jre


# port
EXPOSE 5000

# enviromrntal var
#ENV FLASK_APP=spark_project.py
# Set Spark home environment variable
ENV SPARK_HOME /usr/local/lib/python3.10/site-packages/pyspark


# run app
CMD ["python3", "/app/spark_project.py"]

