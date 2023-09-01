import circle from '../../res/icons/circle-small-custom.png';
import { drawShipPlacementPreview } from '../components/mainGrid';
import { gameBoardManager } from '../objects/gameBoardManager';
import { gameStateManager } from '../objects/gameStateManager';
import missSoundEffect from '../../res/sounds/shotMissed.mp3';
import singleHit from '../../res/sounds/singleHit.wav';
import shipSunk from '../../res/sounds/shipSunk.wav';
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
  let turnText = document.querySelector('.turn-text p');
  if (isValidHit) {
    let cells = Array.from(cell.parentElement.children);
    let hitIndex = cells.indexOf(cell);
    cell.classList.add('cell-hit');
    gameStateManager.enemyShipsHitByPlayer++;

    let returnValue = gameBoardManager.handleHit(
      gameBoardManager.cpuObjectMap,
      hitIndex
    );
    if (returnValue) {
      let shipSunkSound = new Audio(shipSunk);
      shipSunkSound.play();
      turnText.innerText = 'You Sunk A Ship';
    } else {
      let singleHitSound = new Audio(singleHit);
      singleHitSound.play();
      turnText.innerText = 'You Hit A Ship';
    }
  } else {
    let missSound = new Audio(missSoundEffect);
    missSound.play();
    let leftGrid = document.querySelector('.left-side .main-grid');
    leftGrid.classList.add('no-click');

    cell.classList.add('cell-miss');
    img.src = circle;
    cell.append(img);
    gameStateManager.turn = (gameStateManager.turn + 1) % 2;

    turnText.innerText = 'You Missed';
    // cpu move
    let didHit = true;
    await new Promise((r) => setTimeout(r, 500));
    turnText.innerText = 'Opponent Turn';
    while (didHit) {
      await new Promise((r) => setTimeout(r, 500));

      didHit = gameStateManager.handleCPUTurn(
        gameStateManager.ai,
        gameStateManager.playerShipsLocation
      );
      if (didHit) gameStateManager.playerShipsHitByEnemy++;
      else {
        turnText.innerText = 'Opponent Missed';
        await new Promise((r) => setTimeout(r, 1000));
      }
      if (gameStateManager.checkForWinner() != 0) break;
    }

    turnText.innerText = 'Your Turn';
    leftGrid.classList.remove('no-click');
  }
  let winner = gameStateManager.checkForWinner();
  if (winner != 0) {
    gameStateManager.endGame(winner);
  }
};
export { removeDraggable, removeAllCellClicks };
