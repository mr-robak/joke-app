// get file with jokes
const jokes = require("./jokes");

// importing the request package so I can use it in this file
const express = require("express");

// creating a server
const app = express();

// define a port
const port = 5000;

// listen on port AND A Callback function
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// register GET  endpoint
app.get(
  "/:age", // route to listen on  //end point
  //   on request function
  function (request, response) {
    // console.log(request.params);
    const age = parseInt(request.params.age);

    if (isNaN(age)) {
      response.send(`<h2>Please provide a number as a parameter</h2>`);
    } else if (age < 18) {
      const arrayJokes18minus = jokes.filter((joke) => joke.age === "-18");
      const joke = arrayJokes18minus[returnRandomIndex(arrayJokes18minus)].joke;
      response.send(renderPage(age, joke));
    } else {
      const arrayJokes18plus = jokes.filter((joke) => joke.age === "18+");
      const joke = arrayJokes18plus[returnRandomIndex(arrayJokes18plus)].joke;
      response.send(renderPage(age, joke));
    }

    const webPage = renderPage(age); // assign result of a renderPage function to webPage const

    response.send(webPage); //send it to browser
  }
  // callback runs when the route is requested
);

function returnRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

//HTML content
function renderPage(age, joke) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <!-- <link rel="stylesheet" href="style.css" /> -->
      <title>Your age is ${age}</title>
      <style>
        body {
          background-color: rgb(223, 195, 161);
        }
        div {
          margin-top: 25px;
          padding: 5px;
          display: block;
          margin-left: 25%;
          margin-right: 25%;
        }
        .up {
          background-color: rgb(87, 136, 179);
        }
        .down {
          background-color: rgb(119, 68, 85);
        }
        h2,
        h3 {
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="up">
        <h2>
          ${
            age < 18
              ? "Ok kiddo, here is a joke for you:"
              : "Hey, you seem old enough, here is something for you:"
          }
        </h2>
      </div>
      <div class="down">
        <h3>${joke}</h3>
      </div>
    </body>
  </html>
  `;
}

// // GET /test handler callback function
// function onRequest(request, response) {
//     console.log(request.path);
//     const page = render(request.params.age); //request.params.name comes from .get handler
//     //   const page = render(request.params.gender);
//     //   const page = render(request.params.name);

//     response.send(page);
//   }

// app.get(
//   "/student/:name ", // route to listen on  //end point
//   // callback runs when the route is requested
//   function (request, response) {
//     console.log(request.params);
//     const { age, nationality } = request.params;
//     response.send(render(34, name));
//   }
// );
