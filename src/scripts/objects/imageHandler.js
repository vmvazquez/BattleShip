import { gameBoardManager } from './gameBoardManager';
import { healthMap } from './shipArrays';
const resizeImagesOnSideGrid = () => {
  let cell = document.querySelector('.main-grid').firstChild;

  let width = cell.getBoundingClientRect().width;

  let shipCard = getShipCards();

  shipCard.forEach((card) => {
    let health = card.firstChild.childNodes.length;
    let img = card.firstChild.nextSibling;
    img.style.setProperty('width', `${width * health}px`);
  });
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

  let width = cell.getBoundingClientRect().width;

  ships.forEach((ship) => {
    ship.style.setProperty(
      'max-height',
      `${cell.getBoundingClientRect().height}px`
    );
    let health = healthMap.get(ship.src);

    ship.style.setProperty('width', `${width * health}px`);
  });
};
const centerAllHorShipsOnField = (ships) => {
  ships.forEach((ship) => {
    centerImageOnFieldHorizontally(ship);
  });
};

const centerImageOnFieldHorizontally = (image) => {
  let cells = gameBoardManager.map.get(image.src);
  let parent = document.querySelector('.right-side .main-grid');

  let parentCoord = parent.getBoundingClientRect();
  let childCord = cells[cells.length - 1].getBoundingClientRect();
  let imageHeight = image.getBoundingClientRect().height;
  let relativeLeft = childCord.left - parentCoord.left;
  image.style.setProperty('left', `${relativeLeft}px`);

  if (imageHeight < childCord.height * 0.6) {
    image.style.setProperty(
      'top',
      `${childCord.top - parentCoord.top + imageHeight / 2}px`
    );
  } else {
    image.style.setProperty('top', `${childCord.top - parentCoord.top}px`);
  }
};
const getShipImagesOnMainGrid = () => {
  return Array.from(document.querySelectorAll('.grid-container img'));
};
export {
  resizeImagesOnSideGrid,
  resizeHorizontalShipsOnField,
  resizeAndCenterHorShipsOnField,
};
