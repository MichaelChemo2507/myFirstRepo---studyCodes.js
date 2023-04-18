let image = document.getElementById("image"),
    rightArrow = document.getElementById("rightArrow"),
    leftArrow = document.getElementById("leftArrow"),
    generalCnt = 0,
    imageNavBar = document.querySelectorAll("#photoNavBar div");
const photos = ["פרח אדום.jpg", "פרח לבן.jpg", "פרח צהוב.jpg", "פרח ורוד.jpg"];

image.src = photos[generalCnt];
imageNavBar[generalCnt].classList.add("circleHighlight");
rightArrow.onclick = rightArrowPressed;
leftArrow.onclick = leftArrowPressed;

for (const i in imageNavBar) {
    imageNavBar[i].onclick = function () { navBarPressed(i); };
}




function rightArrowPressed() {
    imageNavBar[generalCnt].classList.remove("circleHighlight");
    if (generalCnt==(photos.length - 1)) {
        generalCnt = 0;
    } else {
        ++generalCnt;
    }
    image.src = photos[generalCnt];
    imageNavBar[generalCnt].classList.add("circleHighlight");
} 

function leftArrowPressed() {
    imageNavBar[generalCnt].classList.remove("circleHighlight");
    if (generalCnt==0) {
        generalCnt = photos.length - 1;
    } else {
        --generalCnt; 
    }
    image.src = photos[generalCnt];   
    imageNavBar[generalCnt].classList.add("circleHighlight");
}

function navBarPressed(_i) {
    imageNavBar[generalCnt].classList.remove("circleHighlight");
    image.src = photos[_i];
    generalCnt = _i;
    imageNavBar[generalCnt].classList.add("circleHighlight");
}
    