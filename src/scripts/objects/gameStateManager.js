import { removeAllCellClicks } from '../gameStart/removeDraggable';
import AI from './ai';
import { gameBoardManager } from './gameBoardManager';
import { healthCountArr } from './shipArrays';
class gameStateManagerClass {
  constructor() {
    this.turn = 0;
    this.enemyShipsHitByPlayer = 0;
    this.playerShipsHitByEnemy = 0;
    this.thisPlayerShipMap = new Map();
    this.opponentShipMap = new Map();
    this.ai = new AI();
    this.playerShipsLocation;
  }
  /**
   * Checks to see if there is a winner by seeing if a player has hit
   * the total amount of ship cells available on the field
   * @returns 0: no winner yet
   *          1: player wins
   *          2: cpu wins
   */
  checkForWinner = () => {
    let totalShipCells = healthCountArr.reduce(
      (sum, currentVal) => sum + currentVal,
      0
    );

    if (this.enemyShipsHitByPlayer == totalShipCells) {
      return 1;
    } else if (this.playerShipsHitByEnemy == totalShipCells) {
      return 2;
    } else {
      return 0;
    }
  };
  endGame = (winner) => {
    let text = document.querySelector('.turn-text p');

    // Changing to winner title
    if (winner == 1) {
      text.innerText = '~~YOU ARE THE KING OF THE SEA~~ ';
    } else {
      text.innerText = 'GET REKT BY A CPU';
    }

    // Making cells unclickable
    removeAllCellClicks();
  };
  startGame = () => {
    this.playerShipsLocation = gameBoardManager.convertPlayerMap(
      gameBoardManager.map
    );
  };
  /**
   *
   * @returns
   */
  handleCPUTurn = () => {
    let aiAttack = this.ai.getNextMove();
    console.log('AI ATTACK');
    console.log(aiAttack);
    let result = null;
    let didHit = false;
    // TODO: FIND A BETTER PLACE FOR HTML CODE
    console.log('adding colored class');
    let cells = Array.from(
      document.querySelector('.right-side .main-grid').children
    );
    cells[aiAttack].classList.add('ai-attack');
    if (gameBoardManager.isCpuAttackAHit(aiAttack)) {
      result = gameBoardManager.handleHit(this.playerShipsLocation, aiAttack);

      gameBoardManager.handleHitHTML(result, aiAttack);

      didHit = true;
      if (result != null) {
        let index = this.ai.remainingShips.indexOf(result.health);
        this.ai.remainingShips.splice(index, 1);
      }
    } else {
      gameBoardManager.handleMissHTML(aiAttack);
    }

    return didHit;
  };
}

let gameStateManager = new gameStateManagerClass();
export { gameStateManager };
