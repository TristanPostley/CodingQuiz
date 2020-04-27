var container = document.querySelector(".container");
var myCarousel = $("#myCarousel");
var numberCorrect = document.querySelector("#score");
var usernameForm = document.querySelector("#username");
var usernameInput = document.querySelector("#usernameInput");
var leaderboardList = document.querySelector("#leaderboard");
var leaderboardData = [];
var score = 0;

function compare(a, b) {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
}

function updateLeaderboard() {
    //Slide carousel to Highscore screen
    myCarousel.carousel(1);

    //Exit if no user data found
    if(score == 0 && usernameInput.value == "") return;

    //Log name and score
    if(usernameInput.value == "") usernameInput.value = "Anonymous";
    leaderboardData.push({name: usernameInput.value, score: score});

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
            console.log("Correct Answer")
            myCarousel.carousel("next");
            score++;
        }
        else if($(event.target).hasClass("begin")){
            myCarousel.carousel(2);
            //Start Timer
        }
        else if($(event.target).hasClass("view-highscores")){
            updateLeaderboard();
        }
        else if($(event.target).hasClass("try-again")){
            score = 0;
            myCarousel.carousel(0);
        }
        else{
            console.log("Incorrect Answer")
            myCarousel.carousel("next");
        }

        if($(event.target).hasClass("tally")){
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