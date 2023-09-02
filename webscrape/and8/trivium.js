var battleString = "";

var breaker1 = document.getElementById("dancer1_h").innerText.slice(1);
var breaker2 = document.getElementById("dancer2_h").innerText.slice(1);
var breaker1RoundWin = 0;
var breaker2RoundWin = 0;
var roundWinners = document.getElementsByClassName("round_info");
for (var i = 0; i < roundWinners.length; i++) {
    if (roundWinners[i].classList[1].slice(6,7) == "1") {
        breaker1RoundWin += 1;
    }
    else if (roundWinners[i].classList[1].slice(6,7) == "2") {
        breaker2RoundWin += 1;
    }
}
var numRounds = roundWinners.length;
var breaker1VoteCount = 0;
var breaker2VoteCount = 0;
var winner;
var voteCounts = document.getElementsByTagName("nobr");

for (var i = 1; i < (numRounds + 1); i++) {
    breaker1VoteCount += parseInt(voteCounts[i].innerText.slice(11,12));
    breaker2VoteCount += parseInt(voteCounts[i].innerText.slice(13,14));
}
if (breaker1RoundWin > breaker2RoundWin) {
    winner = breaker1;
}
else if (breaker1RoundWin < breaker2RoundWin) {
    winner = breaker2;
}
else if (breaker1RoundWin == breaker2RoundWin) {
    if (breaker1VoteCount > breaker2VoteCount) {
        winner = breaker1;
    }
    else if (breaker1VoteCount < breaker2VoteCount) {
        winner = breaker2;
    }
    else if (breaker1VoteCount == breaker2VoteCount) {
        winner = "Tie";
    }
}

battleString += breaker1 + "," + breaker2 + "," + winner + ",";
var numJudges = document.getElementsByClassName("judges_width").length / numRounds;
battleString += numRounds + "," + numJudges + "," + breaker1RoundWin + "," + breaker2RoundWin + "," + breaker1VoteCount + "," + breaker2VoteCount + ",";

for (var i = 0; i < numJudges; i++) {
    battleString += document.getElementsByClassName("judges_width")[i].querySelectorAll("#dancer1_tri, #dancer2_tri")[0].firstChild.innerText + ",";
}
for (var i = 0; i < (9 - numJudges); i++) {
    battleString += ",";
}

var ratingSets = document.getElementsByClassName("all_details");
var rating;
var misc;

for (var i = 0; i < ratingSets.length; i++) {
    if (ratingSets[i].parentElement.id == "dancer1_tri") {
        battleString += "-";
    }
    battleString += document.getElementsByClassName("judges_width")[i].querySelectorAll("#dancer1_tri, #dancer2_tri")[0].childNodes[2].innerText.slice(1,-1) + ",";
    for (var j = 0; j < 6; j++) {
        if (ratingSets[i].getElementsByClassName("fader_neu")[j].getElementsByTagName("div").length > 0) {
            rating = ratingSets[i].getElementsByClassName("fader_neu")[j].getElementsByTagName("div")[0];
            if (rating.id == "dancer1") {
                battleString += "-";
            }
            battleString += rating.innerText.slice(1,-1) + ",";
        }
        else {
            battleString += "0,"
        }
    }
    misc = document.querySelectorAll("#button_presses")[i];
    if (misc.textContent) {
        battleString += misc.getElementsByTagName("div")[0].textContent + ",";
        battleString += misc.getElementsByTagName("div")[1].textContent + ",";
    }
    else {
        battleString += ",,";
    }

    if (((i + 1) % numJudges) == 0) {
        for (var m = 0; m < (9 - numJudges); m++) {
            for (var x = 0; x < 8; x++) {
                battleString += ",";
            }
        }
    }
}

console.log(battleString);