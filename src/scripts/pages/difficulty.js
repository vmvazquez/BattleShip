import backArrow from '../../res/icons/back-arrow.png';
import { createLeftSide } from '../startUp/leftSide';
const createDifficultyPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');

  let arrow = document.createElement('img');
  let normalButton = document.createElement('button');
  let challengeButton = document.createElement('button');
  let diffDesc = document.createElement('p');

  arrow.src = backArrow;
  diffDesc.innerText =
    'Some basic gameplay design to tell you some basic information about the difficulty';
  pageTitle.innerText = 'Difficulty';
  normalButton.innerText = 'Normal';
  challengeButton.innerText = 'Challenge';

  arrow.addEventListener('click', backArrowEvent);
  mainContainer.append(
    arrow,
    pageTitle,
    normalButton,
    challengeButton,
    diffDesc
  );
  mainContainer.classList.add('difficulty-aside');
  return mainContainer;
};

const backArrowEvent = () => {
  let diffContent = document.querySelector('.difficulty-aside');

  let parent = diffContent.parentElement;

  parent.replaceChild(createLeftSide(), diffContent);
};
export { createDifficultyPage };
