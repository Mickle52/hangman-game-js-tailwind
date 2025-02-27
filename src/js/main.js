import '../css/style.css';
import {darkModeHandle, langModeHandle,} from './utils'
import { startGame } from './game';

darkModeHandle();
langModeHandle();


const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', startGame);
