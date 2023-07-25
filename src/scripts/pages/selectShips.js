import backArrow from '../../res/icons/back-arrow.png';
import { createDifficultyPage } from './difficulty';
const createShipPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');
  let arrow = document.createElement('img');

  pageTitle.innerText = 'Arrange Ships';
  arrow.src = backArrow;

  arrow.addEventListener('click', backArrowEvent);
  mainContainer.classList.add('select-aside');
  return mainContainer;
};
const backArrowEvent = () => {
  letselectContent = document.querySelector('.select-aside');

  let parent = selectContent.parentElement;

  parent.replaceChild(createDifficultyPage(), selectContent);
};
export { createShipPage };
