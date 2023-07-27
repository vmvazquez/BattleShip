import { draggedObject } from './shipImage';

let currentHoveredCell = 0;
const createGrid = () => {
  let mainContainer = document.createElement('div');
  let backgroundGrid = document.createElement('div');

  backgroundGrid.classList.add('background-grid');
  mainContainer.classList.add('main-grid');

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');

    let p = document.createElement('p');
    p.innerText = i + 1;
    cell.append(p);
    cell.addEventListener('dragenter', (e) => {
      console.log(draggedObject);
      currentHoveredCell = e.target.firstChild.innerText;
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

      cell.classList.add('hovered-cell');
      cell.previousSibling.classList.add('overlap-cell');
      cell.previousSibling.previousSibling.classList.add('overlap-cell');
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
const drawShipPlacement = (eventTarget) => {};
export { createGrid, currentHoveredCell };
