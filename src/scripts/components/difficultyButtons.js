import { generateAIShipLocations } from '../aiLogic/generateShipPosition';
import { nameBoards } from '../gameStart/nameBoards';
import { removeDraggable } from '../gameStart/removeDraggable';
import { gameBoardManager } from '../objects/gameBoardManager';
import { resizeImagesOnPlayingField } from '../objects/imageHandler';
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
    });
    let { finalPositions, directions } = generateAIShipLocations();
    console.log(finalPositions);
    finalPositions.forEach((positions, i) => {
      positions.forEach((index) => {
        mainGrid[index].classList.add(`ai-${i}`);
      });
    });
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
    let leftSide = document.querySelector('.select-aside');
    leftSide.style.visibility = 'hidden';
    mainContainer.style.visibility = 'hidden';
    let newRightSide = createRightSide();
    newRightSide.classList.remove('right-side');
    newRightSide.classList.add('left-side');
    let rightSide = document.querySelector('.right-side');
    rightSide.removeChild(rightSide.lastChild);

    leftSide.parentElement.append(newRightSide);
    leftSide.parentElement.replaceChild(newRightSide, leftSide);
    removeDraggable();
    nameBoards();
    resizeImagesOnPlayingField();
  });
  return mainContainer;
};

export { createDifficultyButtons };
