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
Lotto Texas: 6 numbers 1 - 54
*/

let winningNumbers, megaPowerBall, gameMaxNums;
let ballsToPick = 0;
let chooseGame = document.getElementById('choose-game');
let winningNumbersContainer = document.getElementById('winning-numbers');
let megaPowerBallContainer = document.getElementById('mega-power-ball');

function randomBall(maxNum){	
	// maxNum being the max number of the range the user can pick from the 5 numbers (i.e. 1-70 megaballs) or 25 megaball
	return Math.floor(Math.random() * maxNum + 1);
}

// let machine choose!
function pickAutomatic(game){
	winningNumbers = []; // lets clear the array for repeated tries

	/* check what game was chosen and set rules
		Lotto Rules:
		Powerball: 5 numbers 1 - 69 and power ball 1 - 26
		Mega Millions: 5 Numbers from 1 - 70 and the mega ball from 1 - 25.
		Lotto Texas: 6 numbers 1 - 54
	*/
	if (game === 'PB') {
		megaPowerBall = randomBall(26);
		ballsToPick = 5;
		gameMaxNums = 69;
	}else if(game === 'MB'){
		megaPowerBall = randomBall(25);	
		ballsToPick = 5;
		gameMaxNums = 70;		
	}else {
		megaPowerBall = 'no mega or powerball';	
		ballsToPick = 6;
		gameMaxNums = 54;
	}

	// pick numbers!!
	do {
		winningNumbers.push(randomBall(gameMaxNums));
	} while (winningNumbers.length < ballsToPick);

	// sort numbers in ascending number
	winningNumbers.sort(
		function(a,b){
			return a - b;
		})

	winningNumbersContainer.textContent = winningNumbers;
	megaPowerBallContainer.textContent = megaPowerBall;

	console.log(megaPowerBall, winningNumbers);
}

// get elements and run functions
let rollNumbers = document.getElementById('pick-automatic');
rollNumbers.addEventListener('click', function (e){	
	e.preventDefault();
	pickAutomatic(chooseGame.value);
});

chooseGame.addEventListener('change', function(event){
	var chooseGameVal = event.target.value;
	if (chooseGameVal !== '') {
		rollNumbers.removeAttribute('disabled');
	}
})
