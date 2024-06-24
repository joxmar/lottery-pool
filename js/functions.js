/*
Lottery numbers
- get last POWERBALL draw numbers from api: https://data.ny.gov/resource/d6yy-54nr.json
- if user has previously played, get their numbers from local storage
- draw numbers from button:
	- generate 5 random numbers between 1 and 69 and place it in an array
	- generate 1 random number between 1 and 26
Lotto Rules:
Powerball: 5 numbers 1 - 69 and power ball 1 - 26
*/

// Let's get past draws
let pastDraws;
const drawsApiUrl = 'https://data.ny.gov/resource/d6yy-54nr.json';
const getPastDraws = async function () {
  const response = await fetch(drawsApiUrl);
  pastDraws = await response.json();

  document.getElementById('last-draw-nums').textContent =
    pastDraws[0].winning_numbers;

  //format date from draw_date to mm/dd/yyyy
  const drawDate = new Date(pastDraws[0].draw_date);
  const drawDateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
  const drawDateFormatted = drawDate.toLocaleDateString(
    'en-US',
    drawDateOptions
  );

  document.querySelector('.date').textContent = drawDateFormatted;
};
getPastDraws();

// now let's draw our numbers
let numbers = [];
let powerball;
let drawNumbers = function () {
  // clear numbers
  numbers = [];
  for (let i = 0; i < 5; i++) {
    numberDrawn = Math.floor(Math.random() * 69) + 1;
    // check if number has already been drawn
    if (numbers.includes(numberDrawn)) {
      i--; // go back one step and draw again
    } else {
      numbers.push(numberDrawn);
    }
  }
  // sort numbers in ascending order
  numbers.sort((a, b) => a - b);
  // draw powerball
  powerball = Math.floor(Math.random() * 26) + 1;

  // save numbers to local storage
  let savedNumbers = numbers.concat(powerball);
  localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
  displayNumbers();
};

// display our drawn numbers
const displayNumbers = function () {
  for (let i = 0; i < numbers.length; i++) {
    document.querySelector(`.drawn-num-${i + 1}`).textContent = numbers[i];
  }
  document.getElementById('power-ball').textContent = powerball;
};

// Once document has loaded.
document.addEventListener('DOMContentLoaded', function () {
  // draw numbers
  document
    .querySelector('.draw-numbers-btn')
    .addEventListener('click', function () {
      drawNumbers();
    });

  // if numbers are stored in local storage, display them if not save them
  if (localStorage.getItem('savedNumbers')) {
    // get numbers from local storage
    let savedNumbers = JSON.parse(localStorage.getItem('savedNumbers'));
    document.getElementById('your-last-draw-nums').textContent = savedNumbers
      .slice(0, 6)
      .join(', ');

    // display numbers container
    document.querySelector('.your-nums').classList.remove('hidden');
  }
});
