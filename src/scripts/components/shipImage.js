import { createDraggedObject } from '../objects/draggedObject';
import { gameBoardManager } from '../objects/gameBoardManager';
import { currentHoveredCell, getAllLinkedCells } from './mainGrid';
let draggedObject;
const createShipImage = (health, shipImgSrc) => {
  let boatImage = document.createElement('img');
  boatImage.src = shipImgSrc;
  boatImage.draggable = 'true';
  boatImage.style.setProperty('width', `${getCellWidth() * health}px`);

  boatImage.addEventListener('dragstart', (e) => {
    let imageOnGrid = findImage(shipImgSrc);

    draggedObject = createDraggedObject(imageOnGrid.parentElement);
    boatImage.classList.add('dragging');
    if (e.target.parentElement.matches('.grid-container')) {
      e.target.classList.add('hide');
    }
  });

  boatImage.addEventListener('dragend', (e) => {
    boatImage.classList.remove('dragging');
    let hoveredCell = document.querySelector('.hovered-cell');
    if (hoveredCell) {
      drawImageOnBoard(health, boatImage);
      if (boatImage.parentElement.matches('.grid-container')) {
        boatImage.parentElement.removeChild(boatImage);
        if (gameBoardManager.map.has(boatImage.src)) {
          gameBoardManager.map.get(boatImage.src).forEach((cell) => {
            cell.classList.remove('taken');
          });
        }
        let linkedCells = getAllLinkedCells().map((cell) => {
          cell.classList.add('taken');
          return cell;
        });
        gameBoardManager.map.set(boatImage.src, linkedCells);
      }
    }
  });
  boatImage.classList.add('draggable');

  return boatImage;
};

/**
 * Links an image element from the .ship-grid container from any ship image source.
 * @param {Element| String} imageSrc Either an img element or img string
 * @returns {Element} it returns the image Element of the image from.ship-grid
 */
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
const createBlankImage = () => {
  let span = document.createElement('span');
  span.classList.add('blank');
  document.body.append(span);
  return span;
};
const removeBlankImage = () => {
  let img = document.querySelector('.blank');
  img.parentElement.removeChild(img);
};

/**
 *
 * @param {Integer} health The amount of hit grid boxes an image will take up
 * @param {Element} imageElement The img element container
 */
const drawImageOnBoard = (health, imageElement) => {
  let gridContainer = document.querySelector('.grid-container');

  let newImage = createShipImage(health, imageElement);

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

  if (newImageHeight < cellHeight * 0.9) {
    newImage.style.setProperty('top', `${newTop + cellHeight * 0.2}px`);
  }

  gridContainer.append(newImage);
};
const getCellWidth = () => {
  let gridContainer = document.querySelector('.main-grid').firstChild;
  return gridContainer.getBoundingClientRect().width;
};
export { createShipImage, draggedObject, getCellWidth };
