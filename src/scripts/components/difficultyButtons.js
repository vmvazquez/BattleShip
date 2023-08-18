import { generateAIShipLocations } from '../aiLogic/generateShipPosition';
import { nameBoards } from '../gameStart/nameBoards';
import { removeDraggable } from '../gameStart/removeDraggable';
import { gameBoardManager } from '../objects/gameBoardManager';
import { gameStateManager } from '../objects/gameStateManager';
import {
  resizeAndCenterHorShipsOnField,
  drawAllImagesOnBoardWithPositions,
} from '../objects/imageHandler';
import { createRightSide } from '../startUp/rightSide';
const createDifficultyButtons = () => {
  let autoAssignButton = document.createElement('button');
  let resetButton = document.createElement('button');
  let playButton = document.createElement('button');
  let mainContainer = document.createElement('div');

  autoAssignButton.innerText = 'Auto Assign';

  autoAssignButton.addEventListener('click', () => {
    let mainGrid = Array.from(document.querySelector('.main-grid').children);
    mainGrid.forEach((cell) => {
      cell.removeAttribute('class');
      cell.classList.add('open');
    });
    let { finalPositions, directions } = generateAIShipLocations();
    drawAllImagesOnBoardWithPositions(finalPositions, directions);
  });
  resetButton.innerText = 'Reset';

  resetButton.addEventListener('click', () => {
    let images = Array.from(document.querySelectorAll('.grid-container img'));
    images.forEach((image) => {
      image.classList.add(gameBoardManager.directionMap.get(1));
    });
  });
  playButton.innerText = 'PLAY';

  mainContainer.append(autoAssignButton, resetButton, playButton);
  mainContainer.classList.add('diff-buttons');

  playButton.addEventListener('click', () => {
    gameStateManager.startGame();
    console.log('Game Board CPU');
    console.log(gameBoardManager.cpuShipLocations);
    let leftSide = document.querySelector('.select-aside');
    leftSide.style.visibility = 'hidden';
    mainContainer.style.visibility = 'hidden';
    let newRightSide = createRightSide();
    newRightSide.classList.remove('right-side');
    newRightSide.classList.add('left-side');

    newRightSide.addEventListener('mouseover', (e) => {
      newRightSide.classList.add('attack');
    });
    newRightSide.addEventListener('mouseleave', () => {
      newRightSide.classList.remove('attack');
    });
    let rightSide = document.querySelector('.right-side');
    rightSide.removeChild(rightSide.lastChild);

    leftSide.parentElement.append(newRightSide);
    leftSide.parentElement.replaceChild(newRightSide, leftSide);
    removeDraggable();
    nameBoards();
    resizeAndCenterHorShipsOnField();
  });
  return mainContainer;
};

export { createDifficultyButtons };
