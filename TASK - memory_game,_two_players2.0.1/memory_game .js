const cardsArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];
const newCardsArr = [];

var wrapper = document.getElementsByClassName("wrapper")[0],
  isTwoCardFlipped = false,
  firstCard,
  gameMode,
  isPlayer1Turn,
  points_p1,
  points_p2;

NOTE("choose your game mode ...");

function NOTE(text) {
  var note = document.getElementById("note"),
    textDiv = document.getElementById("text"),
    singlePlayer = document.getElementsByClassName("playMode")[0],
    multiPlayer = document.getElementsByClassName("playMode")[1];
  note.style.display = "grid";
  textDiv.innerHTML = text;
  singlePlayer.addEventListener("click", function () {
    gameMode = "singlePlayer";
    start_game();
  });

  multiPlayer.addEventListener("click", function () {
    gameMode = "multiPlayer";
    start_game();
  });
}
function start_game() {
  document.getElementById("note").style.display = "none";
  set_cards(cardsArr, newCardsArr);
  print_cards(newCardsArr);
  isPlayer1Turn = true;
  document.getElementById("p1").classList.add("currentPlayer");

  var box = document.getElementsByClassName("box");
  for (let i = 0; i < newCardsArr.length; i++) {
    box[i].addEventListener("keyup", function () {
      if (this.style.backgroundImage == "" && !isTwoCardFlipped)
        flip_cards(this, i, newCardsArr);
    });
  }
}
function flip_cards(elem, index, arr) {
  var player_1 = document.getElementById("p1"),
    player_2 = document.getElementById("p2");
  elem.style.backgroundImage = `url(${arr[index]}.jpg)`;
  if (firstCard == undefined) {
    firstCard = elem;
  } else if (firstCard.style.backgroundImage != elem.style.backgroundImage) {
    isTwoCardFlipped = true;
    setTimeout(function () {
      firstCard.style.backgroundImage = "";
      elem.style.backgroundImage = "";
      firstCard = undefined;
      isTwoCardFlipped = false;
      if (gameMode == "multiPlayer") change_turns(player_1, player_2);
    }, 1000);
  } else {
    added_a_point(player_1, player_2);
    firstCard = undefined;

    if (points_p1 + points_p2 == arr.length / 2) {
      if (gameMode == "multiPlayer") {
        let winner = points_p1 > points_p2 ? "points_p1" : "points_p2";
        NOTE(`${winner} won ! <br> choose your mode to resrart...`);
      } else {
        NOTE(`you won ! <br> choose your mode to resrart...`);
      }
    }
  }
}
function added_a_point(_p1, _p2) {
  if (gameMode != "multiPlayer") {
    points_p1++;
    _p1.innerHTML = `player 1: ${points_p1}`;
  } else if (isPlayer1Turn) {
    points_p1++;
    _p1.innerHTML = `player 1: ${points_p1}`;
  } else {
    points_p2++;
    _p2.innerHTML = `player 2: ${points_p2}`;
  }
}
function change_turns(_p1, _p2) {
  isPlayer1Turn = !isPlayer1Turn;
  if (isPlayer1Turn) {
    _p2.classList.remove("currentPlayer");
    _p1.classList.add("currentPlayer");
  } else {
    _p2.classList.add("currentPlayer");
    _p1.classList.remove("currentPlayer");
  }
}
function set_cards(arr, newArr) {
  newArr.splice(0, newArr.length);
  points_p1 = 0;
  points_p2 = 0;
  for (const i of arr) {
    var _cardIndex = Math.floor(Math.random() * arr.length);
    newArr.splice(_cardIndex, 0, i);
  }
}
function print_cards(arr) {
  document.getElementById(
    "playerPointsHolder"
  ).innerHTML = `<div class="playersPoints" id="p1">player 1: 0</div>
  <div class="playersPoints" id="p2">player 2: 0</div>`;
  var section = document.getElementsByClassName("container")[0];
  if (gameMode != "multiPlayer") {
    document.getElementById("p2").style.display = "none";
  }
  section.innerHTML = "";
  for (const i of arr) {
    section.innerHTML += `<div tabIndex="-1" class="box"></div>`;
  }
}
