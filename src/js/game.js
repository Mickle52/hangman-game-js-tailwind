import {WORDS, KEYBOARD_LETTERS} from './consts'

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo')

const createPlaseholdersHTML = () => {
  const word = sessionStorage.getItem('word');
  const wordArray = Array.from(word)
  const placeholdersHTML = wordArray.reduce((acc, cur, i) => {
    return acc + `<h1 id="letter_${i}" class="letter">_</h1>`
  }, '')
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement('div')
  keyboard.classList.add('keyboard')
  keyboard.id = 'keyboard'
  
  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, cur) => {
    return  acc + `<button class="button-primary keyboard-button" id="${cur}">${cur}</button>`
  }, '')
  
  keyboard.innerHTML = keyboardHTML
  return keyboard
}

const createHangmanImg = () => {
  logoH1.classList.add('logo-smaller')
  const image = document.createElement('img')
  image.src = 'images/hg-0.png'
  image.alt = 'hangman image'
  image.classList.add('hangman-img')
  image.id = 'hangman-img'
  
  return image
}


export const startGame = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);

  gameDiv.innerHTML = createPlaseholdersHTML();
  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left"
  class="font-medium text-red-600">10</span></p>`
  
  const hangmanImg = createHangmanImg()
  gameDiv.prepend(hangmanImg)
  
  const keyboardDiv = createKeyboard()
  keyboardDiv.addEventListener('click', (event) => {
    console.log(event.target.id)
  })
  gameDiv.appendChild(keyboardDiv)
};


