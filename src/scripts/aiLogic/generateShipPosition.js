import lodash from 'lodash';
const generateShipLocations = (shipObjectArray = null) => {
  let locations = new Map();
};

const generateShipLocation = (shipHealth, locationMap) => {
  let direction = getRandomInt(4);
  let row = getRandomInt(10);
  let column = getRandomInt(10);
  switch (direction) {
    case 0:
      break;
    case 1:
      break;

    case 2:
      break;
    case 3:
      break;
  }
};

const getContinuousLocationsEast = (row, column, shipHealth) => {
  let endColumn = column + shipHealth;
  if (endColumn < 10) {
    return range(row * 10 + column, endColumn, 1);
  }
  return null;
};

const getContinuousLocationsWest = (row, column, shipHealth) => {
  let endColumn = column - shipHealth;
  if (shipHealth == 1) {
    return row * 10 + column;
  } else if (endColumn > -2) {
    return lodash.range(row * 10 + column, endColumn, -1);
  }
  return null;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
