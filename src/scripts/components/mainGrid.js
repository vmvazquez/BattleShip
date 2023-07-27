import { draggedObject, getCellWidth } from './shipImage';
let currentHoveredCell = 0;
const createGrid = () => {
  let mainContainer = document.createElement('div');
  let backgroundGrid = document.createElement('div');

  backgroundGrid.classList.add('background-grid');
  mainContainer.classList.add('main-grid');

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');

    // let p = document.createElement('p');
    // p.innerText = i + 1;
    // cell.append(p);
    cell.addEventListener('dragenter', (e) => {
      drawShipPlacementPreview(e.target);
    });

    mainContainer.append(cell);
  }
  backgroundGrid.append(mainContainer);

  return mainContainer;
};

/**
 *
 * @param {Element} eventTarget  The cell that the mouse is currently over while
 * dragging a ship
 */
const drawShipPlacementPreview = (eventTarget) => {
  let previouslyHoveredCell = document.querySelectorAll('.hovered-cell');

  if (previouslyHoveredCell) {
    Array.from(previouslyHoveredCell).forEach((cell) => {
      cell.classList.remove('hovered-cell');
    });
  }

  let previousOverlap = document.querySelectorAll('.overlap-cell');
  if (previousOverlap) {
    Array.from(previousOverlap).forEach((cell) => {
      cell.classList.remove('overlap-cell');
    });
  }
  let invalid = document.querySelectorAll('.invalid-cell');
  if (invalid) {
    Array.from(invalid).forEach((cell) => {
      cell.classList.remove('invalid-cell');
    });
  }
  let previouslyStartingCell = document.querySelectorAll('.starting-cell');

  if (previouslyStartingCell) {
    Array.from(previouslyStartingCell).forEach((cell) => {
      cell.classList.remove('starting-cell');
    });
  }
  eventTarget.classList.add('starting-cell');
  //TODO this will only work if placing right to left
  let rightToLeft = true;
  let currentCell = eventTarget;
  console.log('current cell');
  console.log(currentCell);

  let startingX = eventTarget.getBoundingClientRect().left;
  let nextCellX = startingX;

  let cellArray = [];

  if (rightToLeft) {
    cellArray = getAllLinkedCells();
    // let loopControl = nextCellX <= startingX && !currentCell.matches('.taken');
    // for (let i = 0; i < draggedObject.health && loopControl; i++) {
    //   cellArray.push(currentCell);
    //   currentCell = currentCell.previousSibling;
    //   nextCellX = currentCell.getBoundingClientRect().left;
    // }
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
  // cell.classList.add('hovered-cell');
  // cell.previousSibling.classList.add('overlap-cell');
  // cell.previousSibling.previousSibling.classList.add('overlap-cell');
};
const getAllLinkedCells = () => {
  let cellArray = [];
  let currentCell = document.querySelector('.starting-cell');

  console.log('this is current cell');
  console.log(currentCell);
  let startingX = currentCell.getBoundingClientRect().left;
  let nextCellX = startingX;

  // TODO BUG: currentCell.previousSibling != null
  // doesnt highlight the first div in the grid as red
  // since it doesnt have a previous element
  for (
    let i = 0;
    i < draggedObject.health &&
    nextCellX <= startingX &&
    !currentCell.matches('.taken') &&
    currentCell.previousSibling != null;
    i++
  ) {
    cellArray.push(currentCell);
    currentCell = currentCell.previousSibling;
    nextCellX = currentCell.getBoundingClientRect().left;
  }
  return cellArray;
};
export { createGrid, currentHoveredCell };
