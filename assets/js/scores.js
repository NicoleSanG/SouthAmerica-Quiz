
var highscoresEl = document.querySelector('#highscores');
var clearScores = document.querySelector('#clear');


var scoreboard = document.createElement('ul');
var userValues = JSON.parse(localStorage.getItem('score'));

function generateLis() {
    for (let i = 0; i < userValues.length; i++) {

        //Fetching the user's score and initials from localStorage.
        console.log(userValues[i].score, userValues[i].initials);

        var item = document.createElement('li');
        item.innerText = userValues[i].score + " " + userValues[i].initials;
        
        //Adding the obtained values as text to the list item and appending it to the ordered list element.
        scoreboard.appendChild(item);
        highscoresEl.append(scoreboard);
    };
}
generateLis();


//Adding an event listener to clear the scoreboard from the screen and localStorage when triggered
clearScores.addEventListener('click', function() {
    localStorage.removeItem('score');
    highscoresEl.removeChild(scoreboard);
});