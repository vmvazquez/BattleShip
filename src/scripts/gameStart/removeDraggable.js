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
const cellClick = async (e) => {
  let cell = e.target;

  let img = document.createElement('img');
  cell.removeEventListener('click', cellClick);
  let isValidHit = gameBoardManager.isPlayerAttackAHit(cell);
  if (isValidHit) {
    cell.classList.add('cell-hit');
    gameStateManager.enemyShipsHitByPlayer++;
  } else {
    cell.classList.add('cell-miss');
    img.src = circle;
    cell.append(img);
    gameStateManager.turn = (gameStateManager.turn + 1) % 2;
    let turnText = document.querySelector('.turn-text p');
    turnText.innerText = 'Opponent Turn';
    // cpu move
    let didHit = true;

    while (didHit) {
      await new Promise((r) => setTimeout(r, 1000));
      didHit = gameStateManager.handleCPUTurn(
        gameStateManager.ai,
        gameStateManager.playerShipsLocation
      );
      if (didHit) gameStateManager.playerShipsHitByEnemy++;
    }

    turnText.innerText = 'Your Turn';
  }
  let winner = gameStateManager.checkForWinner();
  if (winner != 0) {
    gameStateManager.endGame(winner);
  }
};
export { removeDraggable, removeAllCellClicks };
