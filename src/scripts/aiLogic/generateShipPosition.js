import lodash from 'lodash';
import { shipImageArr, healthCountArr } from '../objects/shipArrays';

const generateAIShipLocations = (shipObjectArray = null) => {
  let map = Array(100).fill(true);

  let finalPositions = [];
  healthCountArr.forEach((health) => {
    let positions;
    let validPlacementFound = false;

    // Finding positions that don't over lap with other spots
    while (!validPlacementFound) {
      positions = generateRandomShipLocation(health);
      validPlacementFound = true;

      positions.forEach((position) => {
        if (map[position] == false) {
          validPlacementFound = false;
        }
      });
    }

    // Found a valid position
    positions.forEach((position) => {
      map[position] = false;
    });
    finalPositions.push(positions);
  });
  return finalPositions;
};

const generateRandomShipLocation = (shipHealth) => {
  let arr = null;
  while (arr == null) {
    let direction = getRandomInt(4);
    let row = getRandomInt(10);
    let column = getRandomInt(10);

    switch (direction) {
      case 0:
        arr = getContinuousLocationsNorth(row, column, shipHealth);
        break;
      case 1:
        arr = getContinuousLocationsEast(row, column, shipHealth);
        break;
      case 2:
        arr = getContinuousLocationsSouth(row, column, shipHealth);
        break;
      case 3:
        arr = getContinuousLocationsWest(row, column, shipHealth);
        break;
    }
  }
  return arr;
};

/**
 *
 * @param {Integer} row the row integer of where the ship will be placed
 * @param {Integer} column the column integer where the ship will be placed
 * @param {Integer} shipHealth the number of cells this ship will span
 * @returns
 */
const getContinuousLocationsEast = (row, column, shipHealth) => {
  let endColumn = column + shipHealth;
  if (shipHealth == 1) {
    return [row * 10 + column];
  } else if (endColumn < 11) {
    let startingPoint = row * 10 + column;
    let endPoint = startingPoint + shipHealth;
    return lodash.range(startingPoint, endPoint, 1);
  }
  return null;
};

/**
 *
 * @param {Integer} row the row integer of where the ship will be placed
 * @param {Integer} column the column integer where the ship will be placed
 * @param {Integer} shipHealth the number of cells this ship will span
 * @returns
 */
const getContinuousLocationsWest = (row, column, shipHealth) => {
  let endColumn = column - shipHealth;

  if (shipHealth == 1) {
    return [row * 10 + column];
  } else if (endColumn > -2) {
    let startingPoint = row * 10 + column;
    let endPoint = startingPoint - shipHealth;
    return lodash.range(startingPoint, endPoint, -1).sort();
  }
  return null;
};
const getContinuousLocationsNorth = (row, column, shipHealth) => {
  let endRow = row - shipHealth;
  if (shipHealth == 1) {
    return [row * 10 + column];
  } else if (endRow > -2) {
    return lodash.range(row * 10 + column, endRow * 10 + column, -10).reverse();
  }
  return null;
};
const getContinuousLocationsSouth = (row, column, shipHealth) => {
  let endRow = row + shipHealth;
  if (shipHealth == 1) {
    return [row * 10 + column];
  } else if (endRow < 11) {
    return lodash.range(row * 10 + column, endRow * 10 + column, 10);
  }
  return null;
};
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getHorizontalShell = (horizontalArr) => {
  let shellArr = [];
  horizontalArr.forEach((position, i) => {
    shellArr.push(horizontalBotCell(position));
    shellArr.push(horizontalTopCell(position));
    if (i == 0) {
      shellArr.push(horizontalBotLeftCell(position));
      shellArr.push(horizontalTopLeftCell(position));
      shellArr.push(horizontalLeftCell(position));
    } else if (i == horizontalArr.length - 1) {
      shellArr.push(horizontalBotRightCell(position));
      shellArr.push(horizontalTopRightCell(position));
      shellArr.push(horizontalRightCell(position));
    }
  });

  let finalShell = shellArr.filter((position) => position != null);

  return finalShell.sort((a, b) => a - b);
};
const horizontalLeftCell = (position) => {
  let leftSpot = position - 1;
  if (leftSpot % 10 < position % 10 && leftSpot >= 0) {
    return leftSpot;
  }
  return null;
};
const horizontalRightCell = (position) => {
  let rightSpot = position + 1;
  if (rightSpot % 10 > position % 10 && rightSpot < 100) {
    return rightSpot;
  }
  return null;
};
const horizontalTopCell = (position) => {
  let aboveSpot = position - 10;
  if (aboveSpot >= 0) {
    return aboveSpot;
  }
  return null;
};
const horizontalBotCell = (position) => {
  let belowSpot = position + 10;
  if (belowSpot < 100) {
    return belowSpot;
  }
  return null;
};
const horizontalTopLeftCell = (position) => {
  let aboveSpot = position - 11;
  if (aboveSpot >= 0 && aboveSpot % 10 < position % 10) {
    return aboveSpot;
  }
  return null;
};
const horizontalBotLeftCell = (position) => {
  let belowSpot = position + 9;
  if (belowSpot < 100 && belowSpot % 10 < position % 10) {
    return belowSpot;
  }
  return null;
};
const horizontalTopRightCell = (position) => {
  let aboveSpot = position - 9;
  if (aboveSpot >= 0 && aboveSpot % 10 > position % 10) {
    return aboveSpot;
  }
  return null;
};
const horizontalBotRightCell = (position) => {
  let belowSpot = position + 11;
  if (belowSpot < 100 && belowSpot % 10 > position % 10) {
    return belowSpot;
  }
  return null;
};
export {
  getContinuousLocationsEast,
  getContinuousLocationsWest,
  getContinuousLocationsNorth,
  getContinuousLocationsSouth,
  generateRandomShipLocation,
  generateAIShipLocations,
  getHorizontalShell,
};
