import { gameBoardManager } from '../objects/gameBoardManager';
import { draggedObject, getCellWidth } from './shipImage';
gameBoardManager;
let currentHoveredCell = 0;
const createGrid = () => {
  let mainContainer = document.createElement('div');
  let backgroundGrid = document.createElement('div');

  backgroundGrid.classList.add('background-grid');
  mainContainer.classList.add('main-grid');

  mainContainer.addEventListener('mouseover', (e) => {
    console.log('mouse');
    mainContainer.classList.add('attack');
  });
  mainContainer.addEventListener('mouseleave', () => {
    mainContainer.classList.remove('attack');
  });
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');

    cell.addEventListener('dragenter', (e) => {
      drawShipPlacementPreview(e.target);
    });

    mainContainer.append(cell);
  }
  backgroundGrid.append(mainContainer);

  return mainContainer;
};

/**
 * Will look for elements that contain a class of className and remove that class
 * from it element.
 * @param {String} className Class we want to remove from elements
 */
const removeClass = (className) => {
  let containerArray = document.querySelectorAll(`.${className}`);

  if (containerArray) {
    Array.from(containerArray).forEach((element) => {
      element.classList.remove(className);
    });
  }
};

const clearPreviews = () => {
  removeClass('hovered-cell');
  removeClass('overlap-cell');
  removeClass('invalid-cell');
  removeClass('starting-cell');
};
/**
 *
 * @param {Element} eventTarget  The cell that the mouse is currently over while
 * dragging a ship
 */
const drawShipPlacementPreview = (eventTarget) => {
  // Clearing cells that were previously hovered

  clearPreviews();
  // Handling classes for newly hovered elements
  eventTarget.classList.add('starting-cell');
  //TODO this will only work if placing right to left
  let rightToLeft = true;

  let cellArray = [];

  if (rightToLeft) {
    cellArray = getAllLinkedCells();
  }

  // We have all the cells we need to highlight
  cellArray.forEach((cell, i) => {
    if (cellArray.length == draggedObject.health) {
      if (i == 0) {
        cell.classList.add('hovered-cell');
      } else {
        cell.classList.add('overlap-cell');
      }
    } else {
      cell.classList.add('invalid-cell');
    }
  });
};
const getAllLinkedCells = () => {
  console.log('dragged object');
  console.log(draggedObject.img);
  let cellArray = [];
  let currentCell = document.querySelector('.starting-cell');

  let startingX = currentCell.getBoundingClientRect().left;
  let nextCellX = startingX;

  // TODO BUG: currentCell.previousSibling != null
  // doesnt highlight the first div in the grid as red
  // since it doesnt have a previous element

  for (
    let i = 0;
    i < draggedObject.health &&
    nextCellX <= startingX &&
    isValidCell(currentCell) &&
    currentCell.previousSibling != null;
    i++
  ) {
    cellArray.push(currentCell);
    currentCell = currentCell.previousSibling;
    nextCellX = currentCell.getBoundingClientRect().left;
  }
  return cellArray;
};
const isValidCell = (cell) => {
  if (cell.matches('.taken')) {
    if (gameBoardManager.map.has(draggedObject.img.src)) {
      let arr = gameBoardManager.map.get(draggedObject.img.src);
      return arr.includes(cell);
    }

    return false;
  }
  return true;
};
export { createGrid, currentHoveredCell, getAllLinkedCells, clearPreviews };
