import { createDraggedObject } from '../objects/draggedObject';
import { gameBoardManager } from '../objects/gameBoardManager';
import { drawImageOnBoardWithPositions } from '../objects/imageHandler';
import { healthMap } from '../objects/shipArrays';
import {
  clearPreviews,
  getAllLinkedCells,
  getVerticalLinkedCells,
} from './mainGrid';
let draggedObject;
const createShipImage = (health, shipImgSrc, hor = true) => {
  let boatImage = document.createElement('img');
  boatImage.src = shipImgSrc;
  boatImage.draggable = 'true';
  boatImage.style.setProperty('width', `${getCellWidth() * health}px`);
  hor ? boatImage.classList.add('hor') : boatImage.classList.add('vert');
  boatImage.addEventListener('dragstart', (e) => {
    draggedObject = {
      health: healthMap.get(shipImgSrc),
      img: shipImgSrc,
      hor,
    };
    boatImage.classList.add('dragging');
    if (boatImage.parentElement.matches('.grid-container')) {
      boatImage.classList.add('hide');
    }
    if (gameBoardManager.map.has(boatImage.src)) {
      gameBoardManager.map.get(boatImage.src).forEach((cell) => {
        cell.classList.remove('taken');
      });
    }
  });

  boatImage.addEventListener('dragend', (e) => {
    boatImage.classList.remove('dragging');
    let hoveredCell = document.querySelector('.hovered-cell');
    let linkedCells;
    if (boatImage.matches('.hor')) {
      linkedCells = getAllLinkedCells().map((cell) => {
        cell.classList.add('taken');
        return cell;
      });
    } else {
      linkedCells = getVerticalLinkedCells().map((cell) => {
        cell.classList.add('taken');
        return cell;
      });
    }
    linkedCells = linkedCells.reverse();
    let allCells = Array.from(document.querySelector('.main-grid').children);

    let indices = linkedCells.map((cell) => {
      return allCells.indexOf(cell);
    });
    let direction = 0;
    if (hor) {
      direction = 1;
    }

    if (hoveredCell) {
      drawImageOnBoardWithPositions(
        indices,
        createShipImage(health, shipImgSrc, hor),
        direction
      );
      /** @todo this will remove side grid ships and leave hearts and ship name*/
      boatImage.parentElement.removeChild(boatImage);
      // drawDraggedImageOnBoard(health, boatImage);
      // if (boatImage.parentElement.matches('.grid-container')) {
      //   if (gameBoardManager.map.has(boatImage.src)) {
      //     gameBoardManager.map.get(boatImage.src).forEach((cell) => {
      //       cell.classList.remove('taken');
      //     });
      //     boatImage.parentElement.removeChild(boatImage);
      //   }
      // }

      // gameBoardManager.map.set(boatImage.src, linkedCells);
    }
    boatImage.classList.remove('hide');
    clearPreviews();
  });
  boatImage.classList.add('draggable');

  return boatImage;
};

/**
 * Instantly appends ship image to .grid-container div based on
 * the last hovered cell
 * @param {Integer} health The amount of hit grid boxes an image will take up
 * @param {Element} imageElement The img element container
 */
// const drawDraggedImageOnBoard = (health, imageElement) => {
//   let gridContainer = document.querySelector('.grid-container');

//   let newImage = createShipImage(health, imageElement.src, draggedObject.hor);

//   newImage.src = imageElement.src;

//   let hoveredCell = document.querySelector('.hovered-cell');

//   let parent = hoveredCell.parentElement;
//   let newLeft =
//     hoveredCell.getBoundingClientRect().right -
//     parent.getBoundingClientRect().left -
//     imageElement.getBoundingClientRect().width;
//   let newTop =
//     hoveredCell.getBoundingClientRect().top -
//     parent.getBoundingClientRect().top;

//   newImage.style.setProperty('left', `${newLeft}px`);
//   newImage.style.setProperty('top', `${newTop}px`);
//   newImage.style.setProperty(
//     'max-height',
//     `${hoveredCell.getBoundingClientRect().height}px`
//   );
//   let newImageHeight = imageElement.getBoundingClientRect().height;

//   let cellHeight = hoveredCell.getBoundingClientRect().height;

//   if (newImageHeight < cellHeight * 0.9) {
//     newImage.style.setProperty('top', `${newTop + cellHeight * 0.2}px`);
//   }

//   gridContainer.append(newImage);
// };

const getCellWidth = () => {
  let gridContainer = document.querySelector('.main-grid').firstChild;
  return gridContainer.getBoundingClientRect().width;
};

/**
 * Links an image element from the .ship-grid container from any ship image source.
 * @param {Element| String} imageSrc Either an img element or img string
 * @returns {Element} it returns the image Element of the image from.ship-grid
 */
// const findImage = (imageSrc) => {
//   let cards = Array.from(document.querySelectorAll('.ship-card'));

//   let trueImageSrc = imageSrc;
//   if (typeof imageSrc == 'object') {
//     trueImageSrc = imageSrc.src;
//   }

//   let image;
//   cards.forEach((card) => {
//     if (card.firstChild.nextSibling.src == trueImageSrc) {
//       image = card.firstChild.nextSibling;
//     }
//   });
//   return image;
// };

export { createShipImage, draggedObject, getCellWidth };
