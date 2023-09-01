import { nameBoards } from '../gameStart/nameBoards';
import { removeDraggable } from '../gameStart/removeDraggable';
import { gameStateManager } from '../objects/gameStateManager';
import { resizeAndCenterHorShipsOnField } from '../objects/imageHandler';
import { createRightSide } from '../startUp/rightSide';

const mainGridObserverCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    let playButton = document.querySelector('.diff-buttons');

    if (mutation.target.childNodes.length == 8 && playButton) {
      playButton.lastChild.classList.add('ready-to-play');
      playButton.lastChild.addEventListener('click', playButtonEvent);
    } else if (playButton) {
      playButton.lastChild.classList.remove('ready-to-play');
      playButton.lastChild.removeEventListener('click', playButtonEvent);
    }
  }
};

const playButtonEvent = () => {
  let buttonsParent = document.querySelector('.diff-buttons');
  gameStateManager.startGame();
  let leftSide = document.querySelector('.select-aside');
  leftSide.style.visibility = 'hidden';
  buttonsParent.style.visibility = 'hidden';
  let newRightSide = createRightSide();
  newRightSide.classList.remove('right-side');
  newRightSide.classList.add('left-side');

  newRightSide.firstChild.addEventListener('mouseover', (e) => {
    newRightSide.firstChild.classList.add('attack');
  });
  newRightSide.firstChild.addEventListener('mouseleave', () => {
    newRightSide.firstChild.classList.remove('attack');
  });
  let rightSide = document.querySelector('.right-side');
  rightSide.removeChild(rightSide.lastChild);

  leftSide.parentElement.append(newRightSide);
  leftSide.parentElement.replaceChild(newRightSide, leftSide);
  removeDraggable();
  nameBoards();
  resizeAndCenterHorShipsOnField();
};
export { mainGridObserverCallback };
