import backArrow from '../../res/icons/back-arrow.png';
import { createDifficultyPage } from './difficulty';
import { backArrowEvent } from '../eventMethods/backArrow';
import { createShipGrid } from '../components/shipGrid';
import { createColor } from '../components/colorSection';
const createShipPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');
  let arrow = document.createElement('img');
  let shipGrid = createShipGrid();
  pageTitle.innerText = 'Arrange Ships';
  arrow.src = backArrow;

  arrow.addEventListener('click', (e) =>
    backArrowEvent(e, createDifficultyPage)
  );
  mainContainer.classList.add('select-aside');

  mainContainer.append(arrow, pageTitle, createColor(), shipGrid);
  return mainContainer;
};

export { createShipPage };
