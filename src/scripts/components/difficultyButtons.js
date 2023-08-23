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
import { createShipGrid } from './shipGrid';
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
    // let images = Array.from(document.querySelectorAll('.grid-container img'));
    // images.forEach((image) => {
    //   image.classList.add(gameBoardManager.directionMap.get(1));
    // });
    resetEventListener();
  });
  playButton.innerText = 'PLAY';

  mainContainer.append(autoAssignButton, resetButton, playButton);
  mainContainer.classList.add('diff-buttons');

  // playButton.addEventListener('click', () => {

  // });
  return mainContainer;
};

const resetEventListener = () => {
  let oldShipGrid = document.querySelector('.ship-info');
  let newShipGrid = createShipGrid();

  // Replacing old Grid
  oldShipGrid.parentElement.replaceChild(newShipGrid, oldShipGrid);

  // Removing Images on main field
  let images = Array.from(document.querySelectorAll('.grid-container img'));
  images.forEach((img) => {
    img.parentElement.removeChild(img);
  });

  // Clearing css classes from main grid cells
  let cells = Array.from(document.querySelector('.main-grid').children);
  cells.forEach((cell) => {
    cell.removeAttribute('class');
    cell.classList.add('open');
  });
  // resetting player maps
  gameBoardManager.map.clear();
};
export { createDifficultyButtons };
