// get file with jokes
const jokes = require("./jokes");

// console.log(
//   jokes.filter((joke) => joke.age === "18+")[returnRandomIndex(jokes.length)]
//     .joke
// );

console.log(jokes.filter((joke) => joke.age === "18+").length);

// console.log(jokes);

//function randomises index of an array given as an argument
function returnRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

const arrayJokes18plus = jokes.filter((joke) => joke.age === "18+");
const arrayJokes18minus = jokes.filter((joke) => joke.age === "-18");

console.log(arrayJokes18plus[returnRandomIndex(arrayJokes18plus)].joke);

// jokes.filter((joke) => joke.age === "18+")[randomize(jokes.length)].joke; //filter array of jokes for age +18 and randomise index of the joke and show value of .joke property... ufff
