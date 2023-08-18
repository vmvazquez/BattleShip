import AI from './ai';
import { gameBoardManager } from './gameBoardManager';
const createGameStateManager = () => {
  let turn = 0;
  let cpuShipsHit = 0;
  let playerShipsHit = 0;
  let thisPlayerShipMap = new Map();
  let opponentShipMap = new Map();
  let ai = new AI();
  let playerShipsLocation;
  const startGame = (playerShipsLocation) => {
    // let gameOver = false;

    // let turns = 0;
    playerShipsLocation = gameBoardManager.convertPlayerMap(
      gameBoardManager.map
    );
    console.log('THE SOURCE');
    console.log(playerShipsLocation);
    // let objectMap = gameBoardManager.convertPlayerMap(gameBoardManager.map);

    // while (cpuShipsHit < 14 || turns > 100) {
    //   if (turn == 1) {
    //     let didHit = handleCPUTurn(ai, objectMap);
    //     if (!didHit) {
    //       turn = (turn + 1) % 2;
    //       let turnText = document.querySelector('.turn-text p');
    //       turnText.innerText = 'Your Turn';
    //     }
    //   }

    //   if (cpuShipsHit.length == 14) {
    //     gameOver = true;
    //   }

    //   turns++;
    // }
    // console.log('============================');
    // console.log('Finished game');
    // console.log('turns: ' + turns);
  };

  /**
   *
   * @param {Int} cpuShipsHit The number of ship indices the cpu has hit before this turn
   * @param {Object} ai The AI object
   * @returns
   */
  const handleCPUTurn = (ai, playerShipsLocation) => {
    let aiAttack = ai.getNextMove();
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
      result = gameBoardManager.handleHit(playerShipsLocation, aiAttack);

      gameBoardManager.handleHitHTML(result, aiAttack);

      didHit = true;
      if (result != null) {
        let index = ai.remainingShips.indexOf(result.health);
        ai.remainingShips.splice(index, 1);
      }
    } else {
      gameBoardManager.handleMissHTML(aiAttack);
    }

    return didHit;
  };
  return {
    turn,
    thisPlayerShipMap,
    opponentShipMap,
    startGame,
    cpuShipsHit,
    playerShipsHit,
    ai,
    playerShipsLocation,
    handleCPUTurn,
  };
};

let gameStateManager = createGameStateManager();
export { gameStateManager };
