import AI from './ai';
import { gameBoardManager } from './gameBoardManager';
class gameStateManagerClass {
  constructor() {
    this.turn = 0;
    this.cpuShipsHit = 0;
    this.playerShipsHit = 0;
    this.thisPlayerShipMap = new Map();
    this.opponentShipMap = new Map();
    this.ai = new AI();
    this.playerShipsLocation;
  }
  startGame = () => {
    this.playerShipsLocation = gameBoardManager.convertPlayerMap(
      gameBoardManager.map
    );
    console.log('THE SOURCE');
    console.log(this.playerShipsLocation);
  };
  /**
   *
   * @param {Int} cpuShipsHit The number of ship indices the cpu has hit before this turn
   * @param {Object} ai The AI object
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
