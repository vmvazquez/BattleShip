import { createGrid } from '../components/mainGrid';
const createRightSide = () => {
  let gridContainer = document.createElement('div');
  let mainContainer = document.createElement('aside');

  gridContainer.classList.add('grid-container');

  let grid = createGrid();

  gridContainer.append(grid);
  mainContainer.append(gridContainer);

  mainContainer.classList.add('right-side');
  return mainContainer;
};

export { createRightSide };
