import { createShipImage, removeShipCard } from '../components/shipImage';
import { gameBoardManager } from './gameBoardManagerold';
import { healthMap, shipImageArr, verticalImageArr } from './shipArrays';
/**
 *
 * @param {Array} positionsArray An array of arrays with positions [[41,42,43],[1,11,21]]
 * @param {*} imgArray an array of img elements
 * @param {*} directionArr an array of integers denoting direction as per @file generateShipPosition.js
 */
const drawAllImagesOnBoardWithPositions = (positionsArray, directionArr) => {
  clearAllShips();
  gameBoardManager.map.clear();
  let allCells = Array.from(
    document.querySelector('.right-side .main-grid').children
  );

  positionsArray.forEach((positions, i) => {
    let imgSrc;
    let isHorizontal = true;
    // Getting vertical or horizontal image
    if (directionArr[i] % 2 == 0) {
      imgSrc = verticalImageArr[i];
      isHorizontal = false;
    } else {
      imgSrc = shipImageArr[i];
    }

    let imgElement = createShipImage(
      healthMap.get(imgSrc),
      imgSrc,
      isHorizontal
    );
    drawImageOnBoardWithPositions(positions, imgElement, directionArr[i]);
    positions.forEach((position) => {
      allCells.at(position).classList.add('taken');
    });
  });

  // Removing all ships
  removeShipsOnSideGrid();
};
const removeShipsOnSideGrid = () => {
  let cards = Array.from(document.querySelectorAll('.ship-card'));
  cards.forEach((card) => {
    card.parentElement.removeChild(card);
  });
};
const clearAllShips = () => {
  let imageContainer = Array.from(
    document.querySelectorAll('.right-side .grid-container img')
  );

  imageContainer.forEach((img) => {
    img.parentElement.removeChild(img);
  });
};
/**
 *
 * @param {Array} positions Position where boat will be. Ex [46,47,48,49]
 * @param {Element} imgElement The ship image element
 */
const drawImageOnBoardWithPositions = (positions, imgElement, direction) => {
  let cells = Array.from(
    document.querySelector('.right-side .main-grid').children
  );

  let cellsWhereShipWillBe = [];

  positions.forEach((position) => {
    cellsWhereShipWillBe.push(cells[position]);
  });

  let imageContainer = document.querySelector('.right-side .grid-container');
  imageContainer.append(imgElement);

  imgElement.addEventListener('load', () => {
    // WORKS FOR HORIZONTAL SHIPS
    if (direction % 2 == 0) {
      moveVerticalImageOnField(imgElement, cellsWhereShipWillBe);
      resizeSingleVerticalShipOnField(
        cells[0],
        imgElement,
        healthMap.get(imgElement.src)
      );
    } else {
      resizeSingleHorizontalShipOnField(
        cells[0],
        imgElement,
        healthMap.get(imgElement.src)
      );
      moveHorizontalImageOnField(imgElement, cellsWhereShipWillBe);
    }

    gameBoardManager.map.set(imgElement.src, cellsWhereShipWillBe);
  });
};
const resizeImagesOnSideGrid = () => {
  let cell = document.querySelector('.right-side .main-grid').firstChild;

  let shipCard = getShipCards();

  shipCard.forEach((card) => {
    let health = card.firstChild.childNodes.length;
    let img = card.firstChild.nextSibling;
    resizeWidthOfSingleImage(health, img, cell);
  });
};
/**
 *
 * @param {Integer} health The health of a ship which represents # of cells it hovers
 * @param {Element} img The image element container
 * @param {Element} cell the cell that we will extract the width from
 */
const resizeWidthOfSingleImage = (health, img, cell) => {
  let width = cell.getBoundingClientRect().width;
  img.style.setProperty('width', `${width * health}px`);
};
const getShipCards = () => {
  let shipImages = Array.from(document.querySelectorAll('.ship-card'));
  return shipImages;
};

const resizeAndCenterHorShipsOnField = () => {
  let ships = getShipImagesOnMainGrid();
  resizeHorizontalShipsOnField(ships);
  centerAllHorShipsOnField(ships);
};
const resizeHorizontalShipsOnField = (ships) => {
  let cell = document.querySelector('.right-side .main-grid').firstChild;

  ships.forEach((ship) => {
    let health = healthMap.get(ship.src);

    if (ship.matches('.hor'))
      resizeSingleHorizontalShipOnField(cell, ship, health);
    else resizeSingleVerticalShipOnField(cell, ship, health);
  });
};

/**
 *
 * @param {Element} cell div element for the cell
 * @param {Element} img ship image element
 * @param {Integer} health the number cells the ship img will hover
 */
const resizeSingleHorizontalShipOnField = (cell, img, health) => {
  let width = cell.getBoundingClientRect().width;
  img.style.setProperty(
    'max-height',
    `${cell.getBoundingClientRect().height}px`
  );

  img.style.setProperty('width', `${width * health}px`);
};
const resizeSingleVerticalShipOnField = (cell, img, health) => {
  let height = cell.getBoundingClientRect().height;

  img.style.setProperty('max-width', `${cell.getBoundingClientRect().width}px`);
  img.style.setProperty('height', `${height * health}px`);
};
/**
 *
 * @param {Array} ships An array filled with img tag elements of ships
 * @inner {GameBoardManager} It uses gameBoardManager.map
 */
const centerAllHorShipsOnField = (ships) => {
  ships.forEach((ship) => {
    moveHorizontalImageOnField(ship, gameBoardManager.map.get(ship.src));
  });
};
/**
 * It places a ship image over the grid cells it should hover. Its left and top
 * css position will be calculated based on the first of it's cell encounter in the grid.
 *
 * @param {Element} image The Image Element
 * @param {Array} cells The cells where that image should be placed at. [div,div,div,div]
 */
const moveHorizontalImageOnField = (image, cells) => {
  let { relativeLeft, relativeTop } = getShipNewLeftTopPosition(cells, image);

  image.style.setProperty('left', `${relativeLeft}px`);

  image.style.setProperty('top', `${relativeTop}px`);
};
const getShipImagesOnMainGrid = () => {
  return Array.from(
    document.querySelectorAll('.right-side .grid-container img')
  );
};
const moveVerticalImageOnField = (image, cells) => {
  let { relativeLeft, relativeTop } = getShipNewLeftTopPositionV(cells, image);
  image.style.setProperty('left', `${relativeLeft}px`);

  image.style.setProperty('top', `${relativeTop}px`);
};
/**
 *
 * @param {Array} cellsArray Array containing cells where ship will be placed. [div,div,div,div]
 * @param {Element} img Image Element
 *
 *
 */
const getShipNewLeftTopPosition = (cellsArray, img) => {
  /**@TODO fix cellsArray to use last or first element based on ship orientation */
  let childCord;

  childCord = cellsArray[0].getBoundingClientRect();
  if (cellsArray[0].previousSibling == cellsArray[1]) {
    childCord = cellsArray[cellsArray.length - 1].getBoundingClientRect();
  }
  let parent = document.querySelector('.right-side .main-grid');
  let parentCoord = parent.getBoundingClientRect();
  let relativeLeft = childCord.left - parentCoord.left;
  let relativeTop;
  let imageHeight = img.getBoundingClientRect().height;
  if (imageHeight < childCord.height * 0.6) {
    relativeTop = childCord.top - parentCoord.top + imageHeight / 2;
  } else {
    relativeTop = childCord.top - parentCoord.top;
  }

  return { relativeLeft, relativeTop };
};
const getShipNewLeftTopPositionV = (cellsArray, img) => {
  let childCord = cellsArray[0].getBoundingClientRect();
  let parent = document.querySelector('.right-side .main-grid');
  let parentCoord = parent.getBoundingClientRect();
  let relativeLeft = childCord.left - parentCoord.left;
  let relativeTop;
  //   let imageHeight = img.getBoundingClientRect().height;
  relativeTop = childCord.top - parentCoord.top;
  //   if (imageHeight < childCord.height * 0.6) {
  //     relativeTop = childCord.top - parentCoord.top + imageHeight / 2;
  //   } else {

  //   }

  return { relativeLeft, relativeTop };
};
export {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
  drawImageOnBoardWithPositions,
  drawAllImagesOnBoardWithPositions,
};
