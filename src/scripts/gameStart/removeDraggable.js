import circle from '../../res/icons/circle-small-custom.png';
import { drawShipPlacementPreview } from '../components/mainGrid';
import { gameBoardManager } from '../objects/gameBoardManager';
import { gameStateManager } from '../objects/gameStateManager';
const removeDraggable = () => {
  removeDraggableFromImages();
  removeDragEnterFromCells();
};

const removeDraggableFromImages = () => {
  let images = Array.from(document.querySelectorAll('img'));

  images.forEach((img) => {
    img.classList.remove('draggable');
    img.draggable = false;
  });
};
const removeDragEnterFromCells = () => {
  let cells = Array.from(document.querySelectorAll('.main-grid > div'));

  cells.forEach((cell) => {
    cell.removeEventListener('dragenter', drawShipPlacementPreview);
  });
  addCellClicks();
};
const addCellClicks = () => {
  let opponentCells = Array.from(
    document.querySelector('.left-side .grid-container .main-grid').children
  );

  opponentCells.forEach((cell) => {
    if (cell.children.length == 1) cell.addEventListener('click', cellClick);
  });
};
const removeAllCellClicks = () => {
  let opponentCells = Array.from(
    document.querySelector('.left-side .grid-container .main-grid').children
  );

  opponentCells.forEach((cell) => {
    if (cell.children.length == 1) cell.removeEventListener('click', cellClick);
  });
};
const cellClick = (e) => {
  let cell = e.target;
  console.log('about to hit a cell');
  let isValidHit = gameBoardManager.isPlayerAttackAHit(cell);
  if (isValidHit) {
    console.log('hit');
  } else {
    console.log('miss');
    gameStateManager.turn = (gameStateManager.turn + 1) % 2;
    let turnText = document.querySelector('.turn-text p');
    turnText.innerText = 'Opponent Turn';
  }

  let img = document.createElement('img');
  img.src = circle;
  cell.classList.add('cell-miss');
  cell.append(img);

  cell.removeEventListener('click', cellClick);
};
export { removeDraggable };
