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
  let img = document.createElement('img');
  cell.removeEventListener('click', cellClick);
  let isValidHit = gameBoardManager.isPlayerAttackAHit(cell);
  if (isValidHit) {
    console.log('hit');
    cell.classList.add('cell-hit');
  } else {
    console.log('miss');
    cell.classList.add('cell-miss');
    img.src = circle;
    gameStateManager.turn = (gameStateManager.turn + 1) % 2;
    let turnText = document.querySelector('.turn-text p');
    turnText.innerText = 'Opponent Turn';
    // cpu move
    let didHit = true;
    console.log('===========================');
    console.log('CPU TURN');
    while (didHit) {
      console.log('BEFORE');

      console.log(gameStateManager.playerShipsLocation);
      didHit = gameStateManager.handleCPUTurn(
        gameStateManager.ai,
        gameStateManager.playerShipsLocation
      );
      console.log('AFTER');

      console.log(gameStateManager.playerShipsLocation);
    }

    turnText.innerText = 'Your Turn';
  }

  cell.append(img);
};
export { removeDraggable };
