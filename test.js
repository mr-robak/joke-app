// const jokesDataJson = require("./data.json"); // get file with jokes
const express = require("express"); // importing the request package so I can use it in this file

const app = express(); // creating a server
const port = 5000; // define a port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const axios = require("axios");

async function getData() {
  const url = "http://localhost:3000/someextremelycomplicatedurl";
  try {
    const jokeServerResponse = await axios.get(url);
    // console.log("TEST from async func: ", jokeServerResponse.data);
    // get data out of JSON
    const jokesDataJson = jokeServerResponse.data;
    const { yomamma, chuck, yoImg, chuckImg } = jokesDataJson;
  } catch (error) {
    console.log("error.message test:", error.message);
  }
}
getData();
// console.log(getData());
// jokesDataJson = getData();

// app.get("/", (request, response) => {
//   const title = "Choose!";
//   const htmlClass = renderHtml(title);
//   const page = renderPage(title, htmlClass);
//   response.send(page);
// });
