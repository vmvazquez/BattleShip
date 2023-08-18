import AI from './ai';
import { gameBoardManager } from './gameBoardManager';
const createGameStateManager = () => {
  let turn = 0;

  let thisPlayerShipMap = new Map();
  let opponentShipMap = new Map();

  const startGame = () => {
    let gameOver = false;
    let ai = new AI();
    let turns = 0;
    let totalHits = 0;

    let objectMap = gameBoardManager.convertPlayerMap(gameBoardManager.map);

    let cellBoard = Array.from(document.querySelector('.main-grid').children);
    console.log('Begin \n================');
    while (totalHits < 14 || turns > 100) {
      let result = null;
      console.log('========================================');
      let aiAttack = ai.getNextMove();
      console.log('attack index');
      console.log(aiAttack);
      if (gameBoardManager.isCpuAttackAHit(aiAttack)) {
        result = gameBoardManager.handleHit(objectMap, aiAttack);
        console.log('HIT');
        console.log(result);
        gameBoardManager.handleHitHTML(result, aiAttack);
        totalHits++;
      } else {
        console.log('MISS');

        gameBoardManager.handleMissHTML(aiAttack);
      }

      if (result != null) {
        let index = ai.remainingShips.indexOf(result.health);
        ai.remainingShips.splice(index, 1);
      }

      if (totalHits.length == 14) {
        gameOver = true;
      }

      turns++;
    }
    console.log('=======================');
    console.log('finished game');
    console.log('Turns: ' + turns);
  };

  return { turn, thisPlayerShipMap, opponentShipMap, startGame };
};

let gameStateManager = createGameStateManager();
export { gameStateManager };
