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
window.addEventListener('keydown', () => {
  let img = createShipImage(4, shipImageArr[0]);
  drawImageOnBoardWithPositions([41, 42, 43, 44], img);
});
