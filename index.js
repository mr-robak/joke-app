// import express
const express = require("express");

// create express server
const app = express();

function render(title, message) {
  const document = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test</title>
  </head>
  <body>
      <h1>${title}</h1>
      <div>${message}</div>
  </body>
  </html>`;
  return document;
}

// register GET  endpoint
app.get(
  "/:age/:nationality", // route to listen on  //end point
  //   onRequest
  function (request, response) {
    console.log(request.params);
    const { age, nationality } = request.params;
    response.send(render(age, nationality));
  }
  // callback runs when the route is requested
);

// // GET /test handler callback function
// function onRequest(request, response) {
//     console.log(request.path);
//     const page = render(request.params.age); //request.params.name comes from .get handler
//     //   const page = render(request.params.gender);
//     //   const page = render(request.params.name);

//     response.send(page);
//   }

app.get(
  "/student/:name ", // route to listen on  //end point
  // callback runs when the route is requested
  function (request, response) {
    console.log(request.params);
    const { age, nationality } = request.params;
    response.send(render(age, nationality));
  }
);

const port = 3000;
// start listening with 2 arguments: port and a callback function
app.listen(port, () => console.log(`Listening on :${port}`));
