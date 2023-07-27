import sub from '../../res/ships/sub.png';
import { createGrid } from '../components/mainGrid';

const createRightSide = () => {
  let mainContainer = document.createElement('div');

  mainContainer.classList.add('grid-container');

  let grid = createGrid();

  let img = document.createElement('img');
  img.addEventListener('click', (e) => {
    console.log('main cointainer');
    console.log(mainContainer.getBoundingClientRect());
  });
  img.src = sub;
  img.classList.add('placed-image');
  img.style.setProperty('left', '492px');
  img.style.setProperty('top', '474px');
  // img.set
  mainContainer.append(img, grid);
  return mainContainer;
};

export { createRightSide };
