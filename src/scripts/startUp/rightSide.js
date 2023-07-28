import sub from '../../res/ships/sub.png';
import { createGrid } from '../components/mainGrid';

const createRightSide = () => {
  let mainContainer = document.createElement('div');

  mainContainer.classList.add('grid-container');

  let grid = createGrid();

  mainContainer.append(grid);
  return mainContainer;
};

export { createRightSide };
