import { gameBoardManager } from './gameBoardManager';
import { healthMap } from './shipArrays';

/**
 *
 * @param {Array} positions Position where boat will be. Ex [46,47,48,49]
 * @param {Element} imgElement The ship image element
 */
const drawImageOnBoardWithPositions = (positions, imgElement) => {
  let cells = Array.from(document.querySelector('.main-grid').children);

  let cellsWhereShipWillBe = [];

  positions.forEach((position) => {
    cellsWhereShipWillBe.push(cells[position]);
  });

  let imageContainer = document.querySelector('.grid-container');
  imageContainer.append(imgElement);

  imgElement.addEventListener('load', () => {
    console.log(cellsWhereShipWillBe);
    placeHorizontalImageOnField(imgElement, cellsWhereShipWillBe);
    resizeSingleHorizontalShipOnField(cells[0], imgElement, 4);
    gameBoardManager.map.set(imgElement.src, cellsWhereShipWillBe);
  });
};
const resizeImagesOnSideGrid = () => {
  let cell = document.querySelector('.main-grid').firstChild;

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
  let cell = document.querySelector('.main-grid').firstChild;

  ships.forEach((ship) => {
    let health = healthMap.get(ship.src);
    resizeSingleHorizontalShipOnField(cell, ship, health);
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
/**
 *
 * @param {Array} ships An array filled with img tag elements of ships
 * @inner {GameBoardManager} It uses gameBoardManager.map
 */
const centerAllHorShipsOnField = (ships) => {
  ships.forEach((ship) => {
    placeHorizontalImageOnField(ship, gameBoardManager.map.get(ship.src));
  });
};
/**
 *
 * @param {Array} cellsArray Array containing cells where ship will be placed. [div,div,div,div]
 * @param {Element} img Image Element
 *
 *
 */
const getShipNewLeftTopPosition = (cellsArray, img) => {
  let childCord = cellsArray[cellsArray.length - 1].getBoundingClientRect();
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

/**
 *
 * @param {Element} image The Image Element
 * @param {Array} cells The cells where that image should be placed at. [div,div,div,div]
 */
const placeHorizontalImageOnField = (image, cells) => {
  let { relativeLeft, relativeTop } = getShipNewLeftTopPosition(cells, image);

  image.style.setProperty('left', `${relativeLeft}px`);

  image.style.setProperty('top', `${relativeTop}px`);
};
const getShipImagesOnMainGrid = () => {
  return Array.from(document.querySelectorAll('.grid-container img'));
};
export {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
  drawImageOnBoardWithPositions,
};