// const jokesDataJson = require("./data.json"); // get file with jokes
const express = require("express"); // importing the request package so I can use it in this file

const app = express(); // creating a server

// use $PORT if it is defined
// use 5000 if $PORT is not defined
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const axios = require("axios");

//get data from remote  server

async function getData() {
  if (process.env.PORT) {
    url = "https://joke-app-server.herokuapp.com/someextremelycomplicatedurl";
  } else {
    url = "http://localhost:3000/someextremelycomplicatedurl";
  }
  try {
    const jokeServerResponse = await axios.get(url);
    // console.log("TEST from async func: ", jokeServerResponse.data);
    // get data out of JSON
    const jokesDataJson = jokeServerResponse.data;
    const { yomamma, chuck, yoImg, chuckImg } = jokesDataJson;

    // register GET  endpoints
    app.get("/", (request, response) => {
      const title = "Choose!";
      const htmlClass = renderHtml(title);
      const page = renderPage(title, htmlClass);
      response.send(page);
    });

    app.get(
      "/:selection", // route to listen on  //end point
      //   on request function
      (request, response) => {
        const select = request.params.selection;
        const title =
          select === "chuck"
            ? "Chuck is The Man!"
            : select === "tubbie"
            ? "YO MOMMA!"
            : "notFound";
        const htmlClass = renderHtml(title);
        const page = renderPage(title, htmlClass);
        response.send(page);
      }
    );

    function renderHtml(title) {
      switch (title) {
        case "Choose!":
          htmlClass = [
            `
  <div class="choose">
  <h1>How would you decribe yourself?</h1>
  <h1>Are you more of a ...</h1>
  <div class="lower">
  <span><a href="/tubbie">Tubbie</a></h1></span>
  <h2>or more of a</h2>
  <span><a href="/chuck">Chuck?</a></span>
  </div>
  </div>`,
            "choose",
          ];
          break;
        case "YO MOMMA!":
          htmlClass = renderJoke(title);
          break;
        case "Chuck is The Man!":
          htmlClass = renderJoke(title);
          break;
        default:
          htmlClass = ["", "notFound"];
      }

      return htmlClass;
    }

    function renderJoke(title) {
      const divClass = title === "Chuck is The Man!" ? "chuck" : "tubbie";
      const data = randomJokeImage(title);
      const [joke, imageUrl] = data;

      const html = `<div class="${divClass} up">
  <h3>${joke}</h3>
  </div>
  <div class="${divClass} down">
  <img src="${imageUrl}"/>
  <a href="/${divClass}" class="myButton">How about another one?</a> </div>
  `;

      return [html, divClass];
    }

    function randomJokeImage(title) {
      [joke, imageUrl] =
        title === "Chuck is The Man!"
          ? [randomIndexItem(chuck), randomIndexItem(chuckImg)]
          : [randomIndexItem(yomamma), randomIndexItem(yoImg)];
      return [joke, imageUrl];
    }

    function randomIndexItem(array) {
      arrItem = array[Math.floor(Math.random() * array.length)];
      return arrItem;
    }

    //HTML content
    function renderPage(title, htmlClass) {
      const [html, divClass] = htmlClass;

      return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <!-- <link rel="stylesheet" href="style.css" /> -->
      <title>${title}</title>
      <style>
        body {
          text-align: center;
          
          /* Location of the image */
          background-image: url(images/background-photo.jpg);
          
          /* Background image is centered vertically and horizontally at all times */
          background-position: center center;
          
          /* Background image doesn't tile */
          background-repeat: no-repeat;
          
          /* Background image is fixed in the viewport so that it doesn't move when 
             the content's height is greater than the image's height */
          background-attachment: fixed;
          
          /* This is what makes the background image rescale based
             on the container's size */
          background-size: cover;
          
          /* Set a background color that will be displayed
             while the background image is loading */
          
          background-color: rgb(223, 195, 161);

        }
        div {position: relative;
          margin-top: 25px;
          padding: 5px;
          display: block;
          margin-left: 30%;
          margin-right: 30%;
          }
        .up {
          background-color: rgb(87, 136, 179);
          max-width: 400px; 
        }
        .down {
          background-color: white;
          position: relative
          max-height: 500px;
          max-width: 400px;  
        }
         

        h1.choose {
          color: rgb(42, 42, 42);
        }
        .choose {
          min-width: 200px;
        }
        .lower {
          margin-top: 55px;
        }
        span {
          font-size: 3em;
          font: bolder;
        }
        h3.tubbie {
          color: white;
        }
        body.chuck {
          background-image: url("https://images.unsplash.com/photo-1558967574-5d07ca9a68c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
          background-color: #cccccc;
        }

        body.tubbie {
          background-image: url("https://previews.123rf.com/images/krissiestudio/krissiestudio1507/krissiestudio150700007/43562529-colorful-background-for-kids.jpg");
         }
        body.notFound {
          background-image: url("404.jpeg");
          background-image: url("404.png");
          background-image: url("https://www.sunfundone.com/images/404-error-template-3.png");
                    
          background-color: #cccccc;
        }
        
        .myButton {
          margin: 10px;
          box-shadow: 0px 10px 14px -7px #3e7327;
          background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
          background-color:#77b55a;
          border-radius:4px;
          border:1px solid #4b8f29;
          display:inline-block;
          cursor:pointer;
          color:#ffffff;
          font-family:Arial;
          font-size:13px;
          font-weight:bold;
          padding:6px 12px;
          text-decoration:none;
          text-shadow:0px 1px 0px #5b8a3c;
        }
        .myButton:hover {
          background:linear-gradient(to bottom, #72b352 5%, #77b55a 100%);
          background-color:#72b352;
        }
        .myButton:active {
          position:relative;
          top:1px;
        }
        img {     object-fit: contain;     
          
          
        height:100%;
        width:100%;
        } 
        
    </style>
    </head>
    <body class="${divClass}">
        ${html}
    </body>
    
  </html>
  `;
    }
  } catch (error) {
    console.log("error.message test:", error.message);
  }
}
getData();
