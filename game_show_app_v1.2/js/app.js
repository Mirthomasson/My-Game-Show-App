// 'needed variables'
const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const startOverlay = document.getElementById('overlay');
const hearts = document.querySelectorAll('.tries');
let missedGuesses = 0;

const phrases = [
    'snow white',
    'cinderella',
    'the little mermaid',
    'sleeping beauty',
    'beauty and the beast',
    'the lion king',
    'finding nemo',
    'toy story',
    'moana',
    'frozen'
];


// listen for the start game button to be pressed
startButton.addEventListener('click', function() {
    startOverlay.style.display = 'none';
});

// return a random phrase from an array
function getRandomPhraseAsArray(arr){
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    const newArr = randomPhrase.split('');
    return newArr;
}
const phraseArray = getRandomPhraseAsArray(phrases);


// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
    arr.forEach(function(e){  
    let li = document.createElement('li');
    li.textContent = e;
    console.log();
    if (e === " "){
        li.className = "space";
    } else {
        li.className = "letter";
    }
});
}
addPhraseToDisplay(phraseArray);

function replacePhraseToDisplay(arr){
    phrase.innerHTML = " ";
    let newUl = document.createElement("ul");
    arr.forEach(function(e){ 
    let li = document.createElement("li");
    li.textContent = e;
    if (e === " "){
        li.className = "space";
    } else {
        li.className = "letter";
    }
    newUl.appendChild(li);
});
    phrase.appendChild(newUl);
}


// check if a letter is in the phrase
function checkLetter(button){
    button.classList.add('show');
    const buttonText = button.textContent;
    let buttonMatch = null;
    const letters = document.getElementsByTagName('li');
    Array.from(letters).forEach(function(letter){
        if (button.textContent === letter.textContent.toLowerCase()){
            letter.classList.add('show');
            buttonMatch = buttonText;
        }
    });
    return buttonMatch;
}

// to reset the game
function reset() {
    startButton.textContent = "Reset Game";
    replacePhraseToDisplay(getRandomPhraseAsArray(phrases));
    missedGuesses = 0;
    for (var i = 0; i < hearts.length; i++){
        hearts[i].style.display = "";
        const heartImg = hearts[i].querySelectorAll("img")[0];
        heartImg.src="images/liveheart.png";
    }
    return startOverlay.style.display;
}

startButton.addEventListener("click", reset);
reset();

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        checkLetter(button);
        if (checkLetter(button) == null) {
            missedGuesses += 1;
            const heartImg = hearts[missedGuesses - 1].querySelectorAll("img")[0];
            heartImg.src="images/lostheart.png";
        }
        button.disabled = true;
    }
    checkWin();
});

// check if the game has been won or lost
function checkWin(){
    let title = document.querySelectorAll(".title")[0];
    var letterCount = document.querySelectorAll(".letter");
    var showCount = document.querySelectorAll(".show");
    letterCount = letterCount.length;
    showCount = showCount.length;
    if (letterCount == showCount){
        startOverlay.style.display = '';
        startOverlay.className = "win";
        title.textContent = "You Won!";
        reset();
    } 
    if (missedGuesses >= 5) {
        startOverlay.style.display = '';
        startOverlay.className = "lose";
        title.textContent = "Sorry, you lost.";
        reset();
    } 
}








