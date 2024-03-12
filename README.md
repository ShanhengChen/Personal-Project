
# Ebook Paypal Payment

**Demo**

![1](https://github.com/ShanhengChen/Personal-Project/assets/85982820/e1d36fff-5f28-4eb4-aa2b-06047707b7f2)


# Pixel Flow

**Description**

In this whimsical Java project, you'll embark on a quest to implement a spellbinding flood-fill operation using the mystical powers of Depth-First Search (DFS) and Breadth-First Search (BFS).

**Key Technologies**
- Programming Language: Java
- GUI Library: Swing (javax.swing)
- Image Processing: javax.imageio.ImageIO, java.awt.image.BufferedImage
- Event Handling: java.awt.event.ActionListener, java.awt.event.MouseAdapter, java.awt.event.MouseEvent
- Layout Managers: java.awt.BorderLayout, java.awt.FlowLayout
- Scroll Panes: javax.swing.JScrollPane

**Features**

- Implemented image flood fill using Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms.
- Utilized Java's PixelVertex and PixelGraph classes to effectively handle adjacent pixels with different colors, achieving a structured representation of the graph.

**Installation**

To use Pixel Flow, please follow these steps to download and run the code:

1. Clone the repository:
    ```bash
    git clone https://github.com/ShanhengChen/Pixel Flow.git
    cd Pixel Flow
    ```
2. In the terminal, run the following code:
    ```bash
    javac PixelWriter.java
    javac A6Tester.java
    java A6Tester maze.png
    ```
<br>

**Demo**


<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/2157164c-dd9c-459e-99c3-e89ec3ac9fc3" alt="DFS" style="width:70%; height:70%;">

<br>

<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/4ee76e98-f7aa-4e3a-aee4-77709b0608cc.gif" alt="BFS" style="width:70%; height:70%;">

<br>


# Draw and Guess

**Description**

In this web project, you can freely draw in a web app, and the application identifies objects within the drawn images.

**Key Technologies**

- **Frontend:**
  - JavaScript 
  - Fabric.js 
  - HTML and CSS 

- **Backend:**
  - Node.js 
  - Google Cloud Vision API 

**Features**

- Users can draw on a canvas using Fabric.js.
- The application sends the drawn image data to the server via a POST request to `/processImage`.
- The server, powered by Express, utilizes the Google Cloud Vision API to detect objects on the drawn image.
- Detected object labels are then sent back to the client and displayed on the webpage.

**Installation**

To run this Canvas Object Detection project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Personal-Project/Draw and Guess.git
    cd Draw and Guess
    ```

2. Install the required Node.js packages:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    node main.js
    ```

4. Open a web browser and navigate to `http://localhost:5001`

**Demo** 

<br> 

<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/953b1a7d-f710-4202-86e4-41f9500e342e.gif" alt="BFS" style="width:70%; height:70%;">


<br>

# News Query Website (Azure)

**Description**

The News Query Web is a dynamic web application that leverages the NewsData API to provide real-time news search and display functionality. It allows users to input search queries and retrieve news articles related to their interests.

**Key Technologies**
- HTML / CSS
- C#
- ASP.NET MVC Framework
- NewsData API
- Azure (for deployment)
- Continuous Deployment and Continuous Integration (CD/CI)

**Features**

- Users can enter search queries to find relevant news articles.
- Displays a list of news articles with titles, links, and additional information.
- Utilizes CSS styling for a visually appealing and user-friendly interface.
- Uses ASP.NET MVC framework to handle user requests and API integration.
- Deployed on Azure for seamless access from anywhere.
- Utilizes CD/CI to ensure automated and efficient updates.

**Demo**

https://news-web.azurewebsites.net/
![1](https://github.com/ShanhengChen/Personal-Project/assets/85982820/05775c87-3c8f-43d6-9b2a-c2df7d46af73)

![2](https://github.com/ShanhengChen/Personal-Project/assets/85982820/5f5c1914-c25c-4842-87b5-61d7506bcf7f)




# Cine Magic Recommendation Guru 

**Description**

This Python project utilizes PySpark, Flask, and SQLAlchemy to provide personalized movie recommendations based on user preferences. The system analyzes movie rating data collected from users and presents popular genres and movies on a web page built with Flask. Users can manage their favorite movies using SQLAlchemy, and the system recommends movies based on their preferences.

**Key Technologies**

- Programming Languages: Python, HTML, CSS 
- Data Processing and Analysis: PySpark, Pandas
- Web Development: Flask, SQLAlchemy
- Data Visualization: Matplotlib
- Software Platform: Docker

**Features**

- Analyzes movie rating data collected from users to identify popular genres and movies.
- Allows users to manage their movie collection by providing functionality to delete or modify movies in their favourite movie list.
- Generates personalized movie recommendations based on user preferences.

**Installation**

To use Cine Magic Recommendation Guru, please follow these steps to build a Docker image and run the container:

1. Clone the repository:
    ```bash
    git clone https://github.com/ShanhengChen/cine-magic-recommendation.git
    cd cine-magic-recommendation
    ```
2. Build the Docker image and run the Docker container
    ```bash
    docker build -t cine-magic-recommendation-guru .
    docker run -p 5000:5000 cine-magic-recommendation-guru
    ```

Watch the Cine Magic Recommendation Guru  demo video below:


https://github.com/ShanhengChen/Personal-Project/assets/85982820/c1ca1cac-6031-499f-9ea3-8b8296f9a934


# Myip.ms Web Crawler 


**Description**

This Python project utilizes a web scraping technique （selenium） to extract information from myip.ms. Specifically, it navigates through pages, extracts links, and stores them in an Excel spreadsheet using Panda. This program is designed to mine all links for websites built on the Shopify platform.

**Key Technologies**

- Programming Language: Python
- Web Scraping: Selenium
- OCR Library: ddddocr
- Data Handling: Pandas

**Features**

- Navigates to a target website and extracts link text and URLs from specified elements.
- Handles potential captcha challenges using an OCR library for image recognition.
- Saves the scraped data into an Excel file for further analysis.

**Installation**

To use the Web Scraping script, please follow these steps to install the required dependencies:

1. Install Python on your machine.
2. Install the necessary Python packages:

```shell
pip install (selenium, pandas, ddddocr)
```
**Demo**
![1](https://github.com/ShanhengChen/Personal-Project/assets/85982820/cfae3fb3-25ba-43c7-9d46-c9002acbc042)
![2](https://github.com/ShanhengChen/Personal-Project/assets/85982820/70c47834-1892-4c6c-a355-4eb2803557a0)

# 2D Vampire Survival-Like Game

**Description**

Embark on the adrenaline-pumping journey of "2D Vampire Survival-Like Game," a 2D game that I, a recent graduate, crafted with a perfect blend of simplicity and roguelite excitement. In this minimalistic survival challenge, navigate a cursed night, gather gold for the next survivor, and defy Death's looming inevitability. With no place to hide, your strategic choices and skills become the key to enduring the relentless struggle for survival.

**Key Technologies**

- Game Engine： Unity

- Language： C#

**Features**


- **Survival Challenge:** Face the relentless challenges of the cursed night, where survival is not guaranteed, and every decision matters.

<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/6bde428d-d5a0-4c6d-a0c7-86949203608c" width=50% height=50%>

- **Exp and gold Collection:** Exp and gold play a crucial role in your survival. Take your time to strategically gather and utilize them to enhance your abilities and increase your chances of lasting through the night.

<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/ad268e69-4ba7-4c4d-b017-6278992f4a2a" width=50% height=50%>

- **Offensive Weaponry:** Arm yourself with two or three offensive weapons, focusing on levelling them up one at a time. Strategic weapon upgrades are essential for overcoming increasingly challenging adversaries.

<img src="https://github.com/ShanhengChen/Personal-Project/assets/85982820/d6fa5162-af04-45f8-b205-3c0b3471727f" width=50% height=50%>


**Installation**
1. Clone the repository:
    ```bash
    git clone https://github.com/ShanhengChen/2d Vampire Survival.git
    ```
2. Click and run:
     ```bash
    click 2d Vampire Survival game.txt and run the game
     
    ```
# Victoria Weather Hub

**Description**

The Weather query site fetches data from free weather API ( OpenWeatherMap API) to construct a dynamic website that displays weather information for Victoria, Canada.

**Key Technologies**

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

**Features**

- Displays current weather information including description, temperature, humidity, and wind speed.
- Uses dynamic weather icons based on the weather conditions.

**Victoria Weather Hub demo:**
![Weather query site demo](https://github.com/ShanhengChen/Personal-Project/assets/85982820/677e974f-f489-4cb0-808d-696eb1f6723d)

