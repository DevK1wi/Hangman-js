//  ~~ S C R I P T  F O R  H A N G M A N  G A M E ~~
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message');

// the stick man to be hung 
const figureParts = document.querySelectorAll('.figure-part');

// Words to be used 
const words = ['application', 'programming', 'interface', 'wizard'];

// set word length
let selectedWord = words[Math.floor(Math.random() * words.length)];

// display the letters player got right & wrong 
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
    `;
  
    const innerWord = wordEl.innerText.replace(/\n/g, '');
  
    if (innerWord === selectedWord) {
      finalMessage.innerText = 'Congratulations! You won! ð';
      popup.style.display = 'flex';
    }
  }

  // Update the incorrect letters 
  function updateWrongLettersEl(){
    //   display incorrect letters 
    wrongLetters.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check win / lose state
    if (wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You Lose :('
        popup.style.display = 'flex';
    }
  }

// show the notification
function showNotification(){
    notification.classList.add(show)

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
// ! in vs code keyCode is lined out im not sure why it doesn't seem to effect the code though
// letter press on key stroke
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
             correctLetters.push(letter);

             displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// reset game and replay
playAgainBtn.addEventListener('click', () => {
    // empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();