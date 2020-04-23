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

    // if (age > 18) {
    //   console.log(`Age is sufficient ${age}`);
    // } else {
    //   console.log(`age is not sufficient`);
    // }

    const webPage = renderPage(age);
    response.send(webPage);
  }
  // callback runs when the route is requested
);

function renderPage(age) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
        
    <title>Age is ${age} </title>
    </head>
    <body>
      <h1>Age is ${age}</h1>
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
