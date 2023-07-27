import { createLeftSide } from './leftSide.js';
// import { createMovingBackground } from '../components/movingWater.js';
import { createRightSide } from './rightSide.js';
const createStartUpPage = () => {
  let mainContainer = document.createElement('main');

  let leftSide = createLeftSide();
  let rightSide = createRightSide();
  mainContainer.classList.add('main-content');

  mainContainer.append(leftSide, rightSide);

  return mainContainer;
};

export { createStartUpPage };
