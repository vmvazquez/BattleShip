import { createDraggedObject } from '../objects/draggedObject';
import { currentHoveredCell } from './mainGrid';
let draggedObject;
const createShipImage = (health, shipImgSrc) => {
  let boatImage = document.createElement('img');
  boatImage.src = shipImgSrc;
  boatImage.draggable = 'true';
  boatImage.style.setProperty('width', `${getCellWidth() * health}px`);
  console.log(getCellWidth() * health);
  boatImage.addEventListener('dragstart', (e) => {
    let imageOnGrid = findImage(shipImgSrc);

    draggedObject = createDraggedObject(imageOnGrid.parentElement);
    boatImage.classList.add('dragging');
  });
  boatImage.addEventListener('drag', (e) => {
    // console.log(currentHoveredCell);
  });
  boatImage.addEventListener('dragend', () => {
    boatImage.classList.remove('dragging');
    let hoveredCell = document.querySelector('.hovered-cell');
    if (hoveredCell) {
      drawImageOnBoard(health, boatImage);
      if (boatImage.parentElement.matches('.grid-container')) {
        boatImage.parentElement.removeChild(boatImage);
      }
    }
  });
  boatImage.classList.add('draggable');

  return boatImage;
};
const findImage = (imageSrc) => {
  let cards = Array.from(document.querySelectorAll('.ship-card'));

  let trueImageSrc = imageSrc;
  if (typeof imageSrc == 'object') {
    trueImageSrc = imageSrc.src;
  }

  let image;
  cards.forEach((card) => {
    if (card.firstChild.nextSibling.src == trueImageSrc) {
      image = card.firstChild.nextSibling;
    }
  });
  return image;
};
const drawImageOnBoard = (health, imageElement) => {
  let gridContainer = document.querySelector('.grid-container');

  let newImage = createShipImage(health, imageElement);
  console.log('New Image');
  console.log(newImage);
  newImage.src = imageElement.src;

  let hoveredCell = document.querySelector('.hovered-cell');

  let parent = hoveredCell.parentElement;
  let newLeft =
    hoveredCell.getBoundingClientRect().right -
    parent.getBoundingClientRect().left -
    imageElement.getBoundingClientRect().width;
  let newTop =
    hoveredCell.getBoundingClientRect().top -
    parent.getBoundingClientRect().top;

  newImage.style.setProperty('left', `${newLeft}px`);
  newImage.style.setProperty('top', `${newTop}px`);

  let newImageHeight = imageElement.getBoundingClientRect().height;
  let cellHeight = hoveredCell.getBoundingClientRect().height;
  console.log(newImage.getBoundingClientRect());
  if (newImageHeight < cellHeight * 0.9) {
    newImage.style.setProperty('top', `${newTop + cellHeight * 0.2}px`);
  }

  gridContainer.append(newImage);
};
const getCellWidth = () => {
  let gridContainer = document.querySelector('.main-grid').firstChild;
  return gridContainer.getBoundingClientRect().width;
};
export { createShipImage, draggedObject };
