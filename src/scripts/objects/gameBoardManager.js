import { generateAIShipLocations } from '../aiLogic/generateShipPosition';

const createGameBoardManager = () => {
  let map = new Map();

  let { finalPositions: cpuShipLocations, directions: cpuDirections } =
    generateAIShipLocations();
  let firstPLayerShipLocations = [];
  let directionMap = new Map();
  directionMap.set(0, 'north');
  directionMap.set(1, 'east');
  directionMap.set(2, 'south');
  directionMap.set(3, 'west');
  const isPlayerAttackAHit = (cell) => {
    let arrayCells = Array.from(cell.parentElement.children);
    let targetIndex = arrayCells.indexOf(cell);

    let validHit = false;
    gameBoardManager.cpuShipLocations.forEach((positionArr) => {
      let indexInArray = positionArr.indexOf(targetIndex);
      if (indexInArray > -1) {
        positionArr.splice(indexInArray, 1);
        validHit = true;
      }
    });
    return validHit;
  };
  const isCpuAttackAHit = (attackIndex) => {
    let cells = Array.from(
      document.querySelector('.right-side .main-grid').children
    );

    console.log('printing');
    console.log(cells[0]);
    let cell = cells[attackIndex];
    if (cell.matches('.taken') && !cell.matches('.sunk')) {
      return true;
    }
    return false;
  };
  const convertPlayerMap = (map) => {
    let newMap = new Map();
    let cells = Array.from(
      document.querySelector('.right-side .main-grid').children
    );

    map.forEach((value, key) => {
      let indices = value.map((cell) => {
        return cells.indexOf(cell);
      });
      newMap.set(key, {
        indices,
        health: indices.length,
        hpLeft: indices.length,
      });
    });
    return newMap;
  };
  /**
   *
   * @param {Object} objectMap ship object containing: index of ship, health and remaining hits left
   * @param {Int} hitIndex the index that has hit a ship
   * @returns null: if the attack did not sink a ship
   *          ship object: if the attack sank a ship
   */
  const handleHit = (objectMap, hitIndex) => {
    let returnValue = null;
    objectMap.forEach((value, key) => {
      if (value.indices.includes(hitIndex)) {
        value.hpLeft--;
        if (value.hpLeft == 0) {
          returnValue = value;
        }
      }
    });
    return returnValue;
  };

  /**
   *
   * @param {Object| null} shipObject ship object containing, indices,health , hpLeft
   * @param {Int} hitIndex The index location of the cell hit on the grid
   */
  const handleHitHTML = (shipObject, hitIndex) => {
    let cells = Array.from(
      document.querySelector('.right-side .main-grid').children
    );

    // Sunk ship so remove hit and open classes of cells
    if (shipObject != null) {
      shipObject.indices.forEach((val, i) => {
        cells[val].classList.remove('open');
        cells[val].classList.remove('hit');
      });
    } else {
      // hit a ship so mark the cell as hit and remove open tag
      cells[hitIndex].classList.remove('open');
      cells[hitIndex].classList.add('hit');
    }
  };
  const handleMissHTML = (missIndex) => {
    let cells = Array.from(
      document.querySelector('.right-side .main-grid').children
    );
    cells[missIndex].classList.remove('open');
    cells[missIndex].classList.remove('hit');
  };
  return {
    map,
    cpuShipLocations,
    cpuDirections,
    directionMap,
    firstPLayerShipLocations,
    isPlayerAttackAHit,
    convertPlayerMap,
    handleHit,
    handleHitHTML,
    isCpuAttackAHit,
    handleMissHTML,
  };
};

let gameBoardManager = createGameBoardManager();

export { gameBoardManager };
