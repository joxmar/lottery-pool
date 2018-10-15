/*
Lottery numbers
- user should select his name.
- user sould be able to select what are they playing (mega, power, Texas lotto)
  depending the selection the lotto system shoudl select or let user select the numbers
- if user selected automatic roll then should first review the numbers and decide wether to proceed or roll again
- then once happy the user shoud select who is buying that day and then send the numbers
- the script will via ajax and php send an email including the person's name, selected lotto and numbers.

Lotto Rules:
Mega Millions: 5 Numbers from 1 - 70 and the mega ball from 1 - 25.
Powerball: 5 numbers 1 - 69 and power ball 1 - 26
Texass Lotto: 
*/

let winningNumbers = [];
let ball = 0;
let megaPowerBall;

function randomBall(maxNum){	
	// maxNum being the max number of the range the user can pick from the 5 numbers (i.e. 1-70 megaballs) or 25 megaball
	return Math.floor(Math.random() * maxNum + 1);
}

// let machine choose!
function pickAutomatic(){
	winningNumbers = []; // lets clear the array for repeated clicks
	megaPowerBall = randomBall(25);
	do {
		winningNumbers.push(randomBall(70));
	} while (winningNumbers.length < 5);
	winningNumbers.sort(
		function(a,b){
			return a - b;
		})
	console.log(megaPowerBall, winningNumbers);
}

var rollNumbers = document.getElementById('pick-automatic');
rollNumbers.addEventListener('click', pickAutomatic);
