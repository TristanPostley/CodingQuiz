var container = document.querySelector(".container");
var myCarousel = $("#myCarousel");
var numberCorrect = document.querySelector("#score");
var usernameForm = document.querySelector("#username");
var usernameInput = document.querySelector("#usernameInput");
var leaderboardList = document.querySelector("#leaderboard");
var leaderboardData = [];
var score = 0;
var timer = document.querySelector("#timer");
var secondsRemaining = 300;
var minutesRemaining;
var timeRemainingString;
var interval;

function startTimer(){

    interval = setInterval(function(){
        secondsRemaining--;

        minutesRemaining = Math.floor(secondsRemaining/60);
        var secondsFormatted = (secondsRemaining % 60);
        if(secondsFormatted < 10) secondsFormatted = "0" + secondsFormatted;
        timeRemainingString = minutesRemaining.toString() + ":" + secondsFormatted;
        timer.textContent = timeRemainingString;

        if(secondsRemaining <= 0){
            clearInterval(interval);
            numberCorrect.textContent = "You answered " + score + " correct."
            myCarousel.carousel(12);
        }
    }, 1000);

    
}

function compare(a, b) {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
}

function updateLeaderboard() {
    //Check if any leaderboard data is already stored
    if(localStorage.getItem("leaderboard") != null) leaderboardData = JSON.parse(localStorage.getItem("leaderboard"));

    //Slide carousel to Highscore screen
    myCarousel.carousel(1);

    //Exit if no user data found
    if(score == 0 && usernameInput.value == "") return;

    //Log name and score
    if(usernameInput.value == "") usernameInput.value = "Anonymous";
    leaderboardData.push({name: usernameInput.value, score: score});
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));

    //Reset name and score
    score = 0;
    usernameInput.value = "";

    //Sort Leaderboard by score
    leaderboardData.sort(compare);
    
    // Clear List element 
    leaderboardList.innerHTML = "";

    // Render a new li for each user
    for (var i = 0; i < leaderboardData.length; i++) {
        var name = leaderboardData[i].name;
        var userScore = leaderboardData[i].score;

        var li = document.createElement("li");
        li.textContent = name + ": " + userScore;
        leaderboardList.appendChild(li);
    }
}

container.addEventListener("click", function(event){
    console.log(event.target);
    if(event.target.type == "button"){
        console.log("Button clicked");
        if($(event.target).hasClass("correct")){
            console.log("Correct Answer");
            myCarousel.carousel("next");
            score++;
        }
        else if($(event.target).hasClass("begin")){
            myCarousel.carousel(2);
            startTimer();
        }
        else if($(event.target).hasClass("view-highscores")){
            updateLeaderboard();
        }
        else if($(event.target).hasClass("try-again")){
            score = 0;
            secondsRemaining = 300;
            timer.textContent = "5:00";
            myCarousel.carousel(0);
        }
        else{
            console.log("Incorrect Answer");
            secondsRemaining -= 30;
            myCarousel.carousel("next");
        }

        if($(event.target).hasClass("tally")){
            clearInterval(interval);
            numberCorrect.textContent = "You answered " + score + " correct."
        }
    }else{
        console.log("Not a button");
    }

    myCarousel.carousel("pause");
})

usernameForm.addEventListener("submit", function(event){
    event.preventDefault();
    updateLeaderboard();
})