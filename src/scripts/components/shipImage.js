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
    if (hoveredCell) {
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

const getCellWidth = () => {
  let gridContainer = document.querySelector('.main-grid').firstChild;
  return gridContainer.getBoundingClientRect().width;
};

export { createShipImage, draggedObject, getCellWidth };
