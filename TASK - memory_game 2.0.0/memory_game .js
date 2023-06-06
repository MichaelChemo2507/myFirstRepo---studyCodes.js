const cardsArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];
const newCardsArr = [];

var wrapper = document.getElementsByClassName("wrapper")[0],
  isTowCardFlipped = false,
  firstCard,
  points;

wrapper.innerHTML += `<div id="note"></div>`;
NOTE("press to start ...");

function NOTE(text) {
  var note = document.getElementById("note");
  note.innerHTML = text;
  note.style.display = "block";
  note.addEventListener("click", start_game);
}
function start_game() {
  note.style.display = "none";
  set_cards(cardsArr, newCardsArr);
  print_cards(newCardsArr);

  var box = document.getElementsByClassName("box");
  for (let i = 0; i < newCardsArr.length; i++) {
    box[i].addEventListener("keyup", function () {
      if (this.style.backgroundImage == "" && !isTowCardFlipped) {
        flip_cards(this, i, newCardsArr);
      }
    });
  }
}

function flip_cards(elem, index, arr) {
  elem.style.backgroundImage = `url(${arr[index]}.jpg)`;
  if (firstCard == undefined) {
    firstCard = elem;
  } else if (firstCard.style.backgroundImage != elem.style.backgroundImage) {
    isTowCardFlipped = true;
    setTimeout(function () {
      firstCard.style.backgroundImage = "";
      elem.style.backgroundImage = "";
      firstCard = undefined;
      isTowCardFlipped = false;
    }, 1000);
  } else {
    points++;
    firstCard = undefined;
    document.getElementById("points").innerHTML = points;
    console.log(arr.length / 2);
    console.log(points);
    if (points == arr.length / 2) {
      NOTE("you won ! <br> press to resrart...");
    }
  }
}

function set_cards(arr, newArr) {
  console.log(true);
  newArr.splice(0, newArr.length);
  points = 0;
  for (const i of arr) {
    var _cardIndex = Math.floor(Math.random() * arr.length);
    newArr.splice(_cardIndex, 0, i);
  }
}

function print_cards(arr) {
  var _box = `<div tabIndex="-1" class="box"></div>`,
    section = document.getElementsByClassName("container")[0];
  section.innerHTML = "";
  section.innerHTML += `<div id = "points">${points}</div>`;
  for (const i of arr) {
    section.innerHTML += _box;
  }
}
