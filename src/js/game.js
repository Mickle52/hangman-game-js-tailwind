import {
  WORDS,
  RU_WORDS,
  KEYBOARD_LETTERS,
  RU_KEYBOARD_LETTERS,
} from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
let triesLeft;
let winCount;

const setLanguageArray = (enArr, ruArr) => {
  const langMode = localStorage.getItem("lang");
  if (langMode === "ru") {
    return ruArr;
  } else {
    return enArr;
  }
};

const setLanguageText = (enText, ruText) => {
  const langMode = localStorage.getItem("lang");
  if (langMode === "ru") {
    return ruText;
  } else {
    return enText;
  }
};

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce((acc, cur, i) => {
    return acc + `<h1 id="letter_${i}" class="letter">_</h1>`;
  }, "");
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  let keyboardLangArray = setLanguageArray(
    KEYBOARD_LETTERS,
    RU_KEYBOARD_LETTERS,
  );

  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = keyboardLangArray.reduce((acc, cur) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id="${cur}">${cur}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  if (localStorage.getItem("lang") === "ru") {
    keyboard.classList.add("ru-keyboard");
  }

  return keyboard;
};

const createHangmanImg = () => {
  logoH1.classList.add("logo-smaller");
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const disableLangToggle = () => {
  const langToggle = document.getElementById('toggleLangMode')
  const langLabel = document.getElementById('langLabel')
  langToggle.disabled = true
  langLabel.classList.add('enabled-toggle')
  
  langToggle.addEventListener('click', () => {
    console.log(123)
  })
}

const createMenuButton = () => {
  const mainView = document.getElementById('app')
  const menuButton = document.createElement('button')
  menuButton.innerHTML = `<button class="button-primary reload-btn" onclick="location.reload();">${setLanguageText("Main menu", "Меню")}
    </button>`
  mainView.appendChild(menuButton)
}

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-img").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      `<h2 class="result-header win">${setLanguageText("You won!", "Вы выиграли!")}<h2>`;
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      `<h2 class="result-header lose">${setLanguageText("ou lost :(", "Вы проиграли :(")}<h2>`;
  } else if (status === "quit") {
    logoH1.classList.remove("logo-smaller");
    document.getElementById("hangman-img").remove();
  }

  document.getElementById("game").innerHTML +=
    `<p>${setLanguageText("The word was: ", "Было загадно слово: ")}<span class="result-word">${word}<span></p>
  <button id="play-again" class="button-primary px-5 py-2 mt-5">${setLanguageText("Play again", "Играть заново")}</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  let wordArray = setLanguageArray(WORDS, RU_WORDS);
  triesLeft = 10;
  winCount = 0;
  
  disableLangToggle()
  createMenuButton()
  
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const wordToGuess = wordArray[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();
  ``;
  gameDiv.innerHTML += `<p id="tries" class="mt-2">${setLanguageText("TRIES LEFT: ", "ОСТАЛОСЬ ПОПЫТОК: ")}<span id="tries-left"
  class="font-medium text-red-600">10</span></p>`;

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    `<button id="quit" class="button-secondary px-2 py-1 mt-4">${setLanguageText("Quit", "Сдаться")}</button>`,
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm(
      setLanguageText(
        "Are you sure you want to quit and lose progress?",
        "Вы уверены, что хотите сдаться и потерять прогресс?",
      ),
    );
    if (isSure) {
      stopGame("quit");
    }
  };
};
