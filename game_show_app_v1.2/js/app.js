document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const startBtn = document.querySelector('.btn__reset');
    const qwerty = document.querySelector('#qwerty');
    const phrase= document.querySelector('#phrase');

    let missed= 0;


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

    // Returns a random phrase from an array
    function getRandomPhraseAsArray(arr) {
        const index = Math.floor(Math.random() * arr.length);
        const randomPhrase = arr[index];
        const arrayOfPhraseCharacters = randomPhrase.split('');
        return arrayOfPhraseCharacters;
      }
      
      // Add the letters of a string to the display
      function addPhraseToDisplay(arr) {
        for (const char of arr) {
          const listItem = document.createElement('li');
          if (char === ' ') {
            listItem.className = 'space';
          } else {
            listItem.className = 'letter';
          }
          listItem.textContent = char;
          phrase.firstElementChild.appendChild(listItem);
        }
      }

      // Check if a letter is in the phrase
      function checkLetter(button) {
        const phraseLetters = phrase.firstElementChild.children;
        let matchIsFound = false;
    
        for (const li of phraseLetters) {
          if (li.textContent === button.textContent) {
            li.className += ' show';
            li.style.transition = 'all 0.5s ease-in-out';
            matchIsFound = true;
          }
        }
    
        if (matchIsFound) {
          return button.textContent;
        } else {
          return null;
        }
      }

      // Check if the game has been won or lost
      qwerty.addEventListener('click', (event) => {
        const scoreboardSection = document.querySelector('#scoreboard');
        const hearts = scoreboardSection.firstElementChild.children;
    
        if (event.target.tagName === 'BUTTON') {
          const key = event.target;
          const letterFound = checkLetter(key);
    
          key.className = 'chosen';
          key.setAttribute('disabled', '');
          if (letterFound === null) {
            hearts[missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
            missed++;
          }
        }
        checkWin();
      });
    
      function checkWin() {
        const phraseLetters = document.querySelectorAll('.letter');
        const correctLetters = document.querySelectorAll('.show');
        const overlay = document.querySelector('#overlay');
        const p = document.createElement('p');
    
        if (phraseLetters.length === correctLetters.length) {
          overlay.className = 'win';
          overlay.style.display = '';
          p.textContent = 'You Win!';
          overlay.appendChild(p);
          startBtn.textContent = 'Play Again';
        } else if (missed >= 5) {
          overlay.className = 'lose';
          overlay.style.display = '';
          p.textContent = 'You Lose!';
          overlay.appendChild(p);
          startBtn.textContent = 'Try Again';
        }
      }

      // Listen for the start game button to be pressed
      startBtn.addEventListener('click', () => {
        const overlay = document.querySelector('#overlay');
        const p = overlay.lastElementChild;
        const ul = document.querySelector('ul');
        const phraseArray = getRandomPhraseAsArray(phrases);
    
        ul.innerHTML = '';
        addPhraseToDisplay(phraseArray);
        overlay.style.display = 'none';
    
        if (overlay.className === 'start') {
          overlay.style.display = 'none';
        } else {
          const chosenLetterList = document.querySelectorAll('.chosen');
          const lostHeartList = document.querySelectorAll('[src="images/lostHeart.png"]');
          const keyboardKeysList = document.querySelectorAll('#qwerty button');
    
          missed = 0;
          overlay.style.display = 'none';
          overlay.removeChild(p);
    
          for (const button of chosenLetterList) {
            button.className = '';
          }
    
          for (const heart of lostHeartList) {
            heart.setAttribute('src', 'images/liveHeart.png')
          }
    
          for (const keyboardKey of keyboardKeysList) {
            keyboardKey.removeAttribute('disabled');
          }
        }
      });
});
