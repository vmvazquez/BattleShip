import backArrow from '../../res/icons/back-arrow.png';
import { createLeftSide } from '../startUp/leftSide';
import { backArrowEvent } from '../eventMethods/backArrow';
import { createShipPage } from './selectShips';
import { audioManager } from '../objects/audioManager';
const createDifficultyPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');

  let arrow = document.createElement('img');
  let normalButton = document.createElement('button');
  let challengeButton = document.createElement('button');
  let diffDesc = document.createElement('p');

  arrow.src = backArrow;
  diffDesc.innerText = '';
  pageTitle.innerText = 'Difficulty';
  normalButton.innerText = 'Normal';
  challengeButton.innerText = 'Challenge (TBA)';

  arrow.addEventListener('click', (e) => {
    backArrowEvent(e, createLeftSide);
  });
  mainContainer.append(
    arrow,
    pageTitle,
    normalButton,
    challengeButton,
    diffDesc
  );

  normalButton.addEventListener('click', (e) => {
    audioManager.playClickEffect();
    backArrowEvent(e, createShipPage);
  });
  mainContainer.classList.add('difficulty-aside');
  return mainContainer;
};

export { createDifficultyPage };
