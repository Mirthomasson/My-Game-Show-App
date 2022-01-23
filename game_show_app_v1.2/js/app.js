document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const welcomeScreen = document.getElementById('overlay');
    const startBtn = document.querySelector('btn__reset');
    const qwerty = document.getElementById('qwerty');
    const phraseDiv = document.getElementById('phrase');
    const phraseUL = phraseDiv.firstElementChild;
    const h2 = document.querySelector('h2');
    const hearts = document.querySelectorAll('.tries img');
    const keys = document.querySelectorAll('button');
    
    // const missed = '';
    let missedGuesses = 0;

    // Array of Phrases
    const phrases = [
    "Just Keep Swimming",
    "For A Clownfish He Really Isnt That Funny",
    "Fish Are Friends Not Food",
    "I Shall Call Him Squishy And He Shall Be Mine And He Shall Be My Squishy",
    "Sharkbait Hoo Ha Ha",
    "P Sherman 42 Wallaby Way Sydney",
    "You So Totally Rock Squirt So Gimme Some Fin",
    "I Promise I Will Never Let Anything Happen To You Nemo" 
    ];

    // listen for the start game button to be pressed
    startBtn.addEventListener('click', () => {
       startGame();
    });

  

     // To get a random phrase
    function getRandomPhraseAsArray(arr) {
        // To store a random number based on the length of the array
        const randomPhrase = Math.floor(Math.random() * arr.length);

    // Adds the letters of a string to the array
    const letterArray = arr[randomPhrase].split('');
    // adds phrase to display
    addPhraseToDisplay(letterArray);
    }
    // To creat a list item for each letter and show it
    function addPhraseToDisplay(arr) {
        arr.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            if (text === " ") {
                li.className = "space";
          } else {
              li.className = "letter";
          }
          phraseUL.appendChild(li);
        });
    }
    // Listen for on screen keyboard to be clicked
    qwerty.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON" && event.target.className !== "chosen") {
            event.target.className = "chosen";
            event.target.disabled = true;
            const matchResults = checkLetter(event.target);

    // check if a letter is in the phrase
    function checkLetter(btn) {
        const letterLIs = phraseUL.children;
        let letterFound = null;
        for (i = 0; i < letterLIs.length; i++) {
            if (btn.textContent === letterLIs[i].textContent) {
                letterLIs[i].classList.add('show');
                letterFound += btn.textContent;
            }
        }
        return letterFound;
        }
            if (matchResults === null) {
                missedGuesses++;
                hearts[missedGuesses - 1].src = "images/liveHeart.png";
            }
        }
        const liLetter = document.querySelectorAll('.letter');
        let liShow = document.querySelectorAll('.show');
        checkWin(liLetter.length, liShow.length);
    });

    // check if the game has been won or lost
    function checkWin(letter, show) {
        if (show === letter && missedGuesses < 5) {
            showEndScreen("win", 'You so totally rock, Dude!', "win a");
        } else if (missedGuesses === 5 && show !== letter) {
            showEndScreen("lose", 'You guys made me ink.', "lose a")
        }
    }
    // End Screen
    function showEndScreen(newClass, h2Text, btnClass) {
        welcomeScreen.className = newClass;
        h2Text.innerHTML = h2Text;
        startButton.className = btnClass;
        startButton.textContent = "Try again?";
        welcomeScreen.style.display = "flex";
    }

    // To start game
    function startGame() {
        function startHearts() {
            for (i = 0; i < hearts.length; i++) {
                hearts[i].src = "images/liveHeart.png"; 
            }
        }            
        
        function newKeys() {
            for (i = 0; i < keys.length; i++) {
                keys[i].classList.remove("chosen");
                keys[i].disabled = false;
            }
        }
        function clearPhrase() {
            phrase.UL.replaceChildren();
        }

        welcomeScreen.style.display = "none";
        missedGuesses();
        startHearts();
        newKeys();
        clearPhrase();
        getRandomPhraseAsArray();
    }



});