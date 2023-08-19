import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';
import {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
} from './scripts/objects/imageHandler';

import AI from './scripts/objects/ai';

document.body.append(createStartUpPage());

let ai = new AI();
// let array = [0, 0, 2, 0, 0, 0, 0, 0, 0, 1];
// console.log(ai.getShipPlacementsMatrixH(array, 4));

let result = ai.getFinalMatrix();
ai.printBoard(result);
console.log(ai.getNextMove());
// document.body.appendChild(createMovingBackground());
// document.addEventListener('click', (e) => {
//   console.log(e.target.getBoundingClientRect());
// });

//TODO change the size of ship images based on grid
window.addEventListener('resize', (e) => {
  resizeImagesOnSideGrid();
  resizeAndCenterHorShipsOnField();
});

// window.addEventListener('keydown', function once() {
//   // let img = createShipImage(4, verticalImageArr[0]);

//   // img.classList.add('north');
//   let img = createShipImage(4, shipImageArr[0]);
//   drawImageOnBoardWithPositions([41, 42, 43, 44], img, 0);
//   // drawImageOnBoardWithPositions([41, 51, 61, 71], img, 0);
//   // drawImageOnBoardWithPositions([41, 51, 61, 71], simpleImg);
//   let cells = Array.from(document.querySelector('.main-grid').children);
//   let grid = document.querySelector('.main-grid');

//   console.log('cell 41');
//   console.log(cells[41].getBoundingClientRect());
//   console.log('grid');
//   console.log(grid.getBoundingClientRect());
// });
