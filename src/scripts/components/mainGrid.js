import { gameBoardManager } from '../objects/gameBoardManager';
import { draggedObject } from './shipImage';
gameBoardManager;
let currentHoveredCell = 0;
const createGrid = () => {
  let mainContainer = document.createElement('div');

  mainContainer.classList.add('main-grid');

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');

    let p = document.createElement('p');
    p.innerText = i;
    cell.append(p);
    cell.addEventListener('dragenter', drawShipPlacementPreview);

    cell.classList.add('open');
    mainContainer.append(cell);
  }

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
 * @param {Element} event  The event that was triggered by the cell that the mouse is currently over while
 * dragging a ship
 */
const drawShipPlacementPreview = (e) => {
  // Clearing cells that were previously hovered
  let eventTarget = e.target;
  clearPreviews();
  // Handling classes for newly hovered elements
  eventTarget.classList.add('starting-cell');
  //TODO this will only work if placing right to left
  let rightToLeft = true;

  let cellArray = [];

  if (draggedObject.hor) {
    cellArray = getAllLinkedCells();
  } else {
    cellArray = getVerticalLinkedCells();
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

const getVerticalLinkedCells = () => {
  let cellArray = [];
  let currentCell = document.querySelector('.starting-cell');
  let mainGrid = Array.from(document.querySelector('.main-grid').children);

  let currentIndex = mainGrid.indexOf(currentCell);

  for (
    let i = 0;
    i < draggedObject.health && currentIndex > -1 && isValidCell(currentCell);
    i++
  ) {
    cellArray.push(currentCell);

    currentCell = mainGrid.at(currentIndex - 10);
    currentIndex -= 10;
  }

  return cellArray;
};
const getAllLinkedCells = () => {
  let cellArray = [];
  let currentCell = document.querySelector('.starting-cell');

  let startingX = currentCell.getBoundingClientRect().left;
  let nextCellX = startingX;

  // TODO BUG: currentCell.previousSibling != null
  // doesnt highlight the first div in the grid as red
  // since it doesn't have a previous element

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
  // if (cellArray.length > 1) {
  //   if (cellArray[0].previousSibling == cellArray[1]) {
  //     cellArray.reverse();
  //   }
  // }
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
export {
  createGrid,
  currentHoveredCell,
  getAllLinkedCells,
  clearPreviews,
  drawShipPlacementPreview,
  getVerticalLinkedCells,
};
