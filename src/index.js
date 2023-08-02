import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';
import {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
  drawImageOnBoardWithPositions,
} from './scripts/objects/imageHandler';
import { gameBoardManager } from './scripts/objects/gameBoardManager';
import { shipImageArr } from './scripts/objects/shipArrays';
import { createShipImage } from './scripts/components/shipImage';
document.body.append(createStartUpPage());
// document.body.appendChild(createMovingBackground());
document.addEventListener('click', (e) => {
  console.log(e.target.getBoundingClientRect());
});

//TODO change the size of ship images based on grid
window.addEventListener('resize', (e) => {
  resizeImagesOnSideGrid();
  resizeAndCenterHorShipsOnField();
});

window.addEventListener('keydown', function once() {
  let img = createShipImage(4, shipImageArr[0]);
  let simpleImg = createShipImage(4, shipImageArr[0]);
  // img.classList.add('north');
  drawImageOnBoardWithPositions([41, 42, 43, 44], img);
  // drawImageOnBoardWithPositions([41, 51, 61, 71], simpleImg);
  let cells = Array.from(document.querySelector('.main-grid').children);
  let grid = document.querySelector('.main-grid');

  console.log('cell 41');
  console.log(cells[41].getBoundingClientRect());
  console.log('grid');
  console.log(grid.getBoundingClientRect());
});
