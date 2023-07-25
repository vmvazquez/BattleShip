import { createLeftSide } from './leftSide';
import { createMovingBackground } from './rightSide';
const createStartUpPage = () => {
  let mainContainer = document.createElement('main');

  let leftSide = createLeftSide();
  let rightSide = createMovingBackground();
  mainContainer.classList.add('main-content');

  mainContainer.append(leftSide, rightSide);

  return mainContainer;
};

export { createStartUpPage };
