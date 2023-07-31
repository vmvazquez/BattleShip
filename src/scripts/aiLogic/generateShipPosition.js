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
        //   console.log('north');
        arr = getContinuousLocationsNorth(row, column, shipHealth);
        break;
      case 1:
        //   console.log('East');
        arr = getContinuousLocationsEast(row, column, shipHealth);
        break;
      case 2:
        //   console.log('South');
        arr = getContinuousLocationsSouth(row, column, shipHealth);
        break;
      case 3:
        //   console.log('West');
        //   console.log(row);
        //   console.log(column);
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
    return lodash.range(startingPoint, endPoint, -1).reverse();
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

export {
  getContinuousLocationsEast,
  getContinuousLocationsWest,
  getContinuousLocationsNorth,
  getContinuousLocationsSouth,
  generateRandomShipLocation,
  generateAIShipLocations,
};
