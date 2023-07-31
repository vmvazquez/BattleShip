import { generateAIShipLocations } from '../aiLogic/generateShipPosition';
import { nameBoards } from '../gameStart/nameBoards';
import { removeDraggable } from '../gameStart/removeDraggable';
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
    let finalPositions = generateAIShipLocations();
    console.log(finalPositions);
    finalPositions.forEach((positions, i) => {
      positions.forEach((index) => {
        mainGrid[index].classList.add(`ai-${i}`);
      });
    });
  });
  resetButton.innerText = 'Reset';
  playButton.innerText = 'PLAY';

  mainContainer.append(autoAssignButton, resetButton, playButton);
  mainContainer.classList.add('diff-buttons');

  playButton.addEventListener('click', () => {
    let leftSide = document.querySelector('.select-aside');
    leftSide.style.visibility = 'hidden';
    mainContainer.style.visibility = 'hidden';
    let newRightSide = createRightSide();

    let rightSide = document.querySelector('.right-side');
    rightSide.removeChild(rightSide.lastChild);

    leftSide.parentElement.append(newRightSide);
    leftSide.parentElement.replaceChild(newRightSide, leftSide);
    removeDraggable();
    nameBoards();
  });
  return mainContainer;
};

export { createDifficultyButtons };