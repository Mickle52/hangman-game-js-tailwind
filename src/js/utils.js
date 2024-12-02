export const darkModeHandle = () => {
  const darkModeSwitcher = document.getElementById('toggleDarkMode');
  const htmlElement = document.documentElement;

  if (localStorage.getItem('mode') === 'dark') {
    htmlElement.classList.add('dark');
    darkModeSwitcher.checked = true;
  }

  darkModeSwitcher.addEventListener('input', () => {
    htmlElement.classList.toggle('dark');

    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('mode', 'dark');
    } else {
      localStorage.setItem('mode', 'light');
    }
  });
};

export const langModeHandle = () => {
  const langModeSwitcher = document.getElementById('toggleLangMode');
  const htmlElement = document.documentElement;
  
  if (localStorage.getItem('lang') === 'ru') {
    htmlElement.classList.add('ru');
    langModeSwitcher.checked = true;
    document.getElementById('logo').innerText = '[ ВИСЕЛИЦА ]'
    document.getElementById('startGame').innerText = 'Начать игру'
  } else {
    // document.getElementById('logo').innerText = 'testEN'
  }
  
  langModeSwitcher.addEventListener('input', () => {
    htmlElement.classList.toggle('ru');
    
    if (htmlElement.classList.contains('ru')) {
      localStorage.setItem('lang', 'ru');
      document.getElementById('logo').innerText = '[ ВИСЕЛИЦА ]'
      document.getElementById('startGame').innerText = 'Начать игру'
    } else {
      localStorage.setItem('lang', 'en');
      document.getElementById('logo').innerText = '[ HANGMAN GAME ]'
      document.getElementById('startGame').innerText = 'Start game'
    }
  });
};