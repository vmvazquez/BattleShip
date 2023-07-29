import backArrow from '../../res/icons/back-arrow.png';
import { createDifficultyPage } from './difficulty';
import { backArrowEvent } from '../eventMethods/backArrow';
import { createShipGrid } from '../components/shipGrid';
import { createColor } from '../components/colorSection';
import { createDifficultyButtons } from '../components/difficultyButtons';
createDifficultyButtons;
const createShipPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');
  let arrow = document.createElement('img');
  let shipGrid = createShipGrid();
  let buttonLayout = createDifficultyButtons();

  pageTitle.innerText = 'Arrange Ships';
  arrow.src = backArrow;

  arrow.addEventListener('click', (e) =>
    backArrowEvent(e, createDifficultyPage)
  );
  mainContainer.classList.add('select-aside');

  let rightSideMainContainer = document.querySelector('.right-side');
  rightSideMainContainer.append(buttonLayout);
  mainContainer.append(arrow, pageTitle, createColor(), shipGrid);
  return mainContainer;
};

export { createShipPage };
