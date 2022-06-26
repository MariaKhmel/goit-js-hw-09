
const refs = {
    startButton: document.querySelector('button[data-start]'),
    closeButton: document.querySelector('button[data-stop]'),
    body : document.querySelector('body'),
}

let intervalId = null;
let isButtonClicked = false;


refs.startButton.addEventListener('click', onStartButtonClick);
refs.closeButton.addEventListener('click', onCloseButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



function onStartButtonClick () {
    if (isButtonClicked === true) {
        return;
    }
    isButtonClicked === true;
    intervalId = setInterval(logger, 1000);
    
}

function logger() {
    refs.body.style.backgroundColor = getRandomHexColor();
}


function onCloseButtonClick () {
  
    clearInterval(intervalId);
isButtonClicked === false;
}




