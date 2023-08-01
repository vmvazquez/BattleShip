import lodash from 'lodash';
import { shipImageArr, healthCountArr } from '../objects/shipArrays';

const generateAIShipLocations = (shipObjectArray = null) => {
  let map = Array(100).fill(true);

  let finalPositions = [];
  let directions = [];
  healthCountArr.forEach((health) => {
    let positions;
    let direction;
    let validPlacementFound = false;

    // Finding positions that don't over lap with other spots
    while (!validPlacementFound) {
      ({ positions, direction } = generateRandomShipLocation(health));
      validPlacementFound = true;

      positions.forEach((position) => {
        if (map[position] == false) {
          validPlacementFound = false;
        }
      });
    }
    let shell = getShell(positions, direction);

    shell.forEach((position) => {
      map[position] = false;
    });
    // Found a valid position
    positions.forEach((position) => {
      map[position] = false;
    });
    directions.push(direction);
    finalPositions.push(positions);
  });
  return { finalPositions, directions };
};

const generateRandomShipLocation = (shipHealth) => {
  let positions = null;
  let direction;
  while (positions == null) {
    direction = getRandomInt(4);
    let row = getRandomInt(10);
    let column = getRandomInt(10);

    switch (direction) {
      case 0:
        positions = getContinuousLocationsNorth(row, column, shipHealth);
        break;
      case 1:
        positions = getContinuousLocationsEast(row, column, shipHealth);
        break;
      case 2:
        positions = getContinuousLocationsSouth(row, column, shipHealth);
        break;
      case 3:
        positions = getContinuousLocationsWest(row, column, shipHealth);
        break;
    }
  }
  return { positions, direction };
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

const getShell = (arr, direction) => {
  if (direction % 2 == 0) {
    return getVerticalShell(arr);
  }
  return getHorizontalShell(arr);
};
const getHorizontalShell = (horizontalArr) => {
  let shellArr = [];
  horizontalArr.forEach((position, i) => {
    shellArr.push(getBotCell(position));
    shellArr.push(getTopCell(position));
    if (i == 0) {
      shellArr.push(getBotLeftCell(position));
      shellArr.push(getTopLeftCell(position));
      shellArr.push(getLeftCell(position));
    }
    if (i == horizontalArr.length - 1) {
      shellArr.push(getBotRightCell(position));
      shellArr.push(getTopRightCell(position));
      shellArr.push(getRightCell(position));
    }
  });

  let finalShell = shellArr.filter((position) => position != null);

  return finalShell.sort((a, b) => a - b);
};

const getVerticalShell = (verticalArr) => {
  let shellArr = [];

  verticalArr.forEach((position, i) => {
    shellArr.push(getLeftCell(position));
    shellArr.push(getRightCell(position));

    if (i == 0) {
      shellArr.push(getTopCell(position));
      shellArr.push(getTopRightCell(position));
      shellArr.push(getTopLeftCell(position));
    }
    if (i == verticalArr.length - 1) {
      shellArr.push(getBotCell(position));
      shellArr.push(getBotLeftCell(position));

      shellArr.push(getBotRightCell(position));
    }
  });

  let finalShell = shellArr.filter((position) => position != null);

  return finalShell.sort((a, b) => a - b);
};
const getLeftCell = (position) => {
  let leftSpot = position - 1;
  if (leftSpot % 10 < position % 10 && leftSpot >= 0) {
    return leftSpot;
  }
  return null;
};
const getRightCell = (position) => {
  let rightSpot = position + 1;
  if (rightSpot % 10 > position % 10 && rightSpot < 100) {
    return rightSpot;
  }
  return null;
};
const getTopCell = (position) => {
  let aboveSpot = position - 10;
  if (aboveSpot >= 0) {
    return aboveSpot;
  }
  return null;
};
const getBotCell = (position) => {
  let belowSpot = position + 10;
  if (belowSpot < 100) {
    return belowSpot;
  }
  return null;
};
const getTopLeftCell = (position) => {
  let aboveSpot = position - 11;
  if (aboveSpot >= 0 && aboveSpot % 10 < position % 10) {
    return aboveSpot;
  }
  return null;
};
const getBotLeftCell = (position) => {
  let belowSpot = position + 9;
  if (belowSpot < 100 && belowSpot % 10 < position % 10) {
    return belowSpot;
  }
  return null;
};
const getTopRightCell = (position) => {
  let aboveSpot = position - 9;
  if (aboveSpot >= 0 && aboveSpot % 10 > position % 10) {
    return aboveSpot;
  }
  return null;
};
const getBotRightCell = (position) => {
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
  getVerticalShell,
};
