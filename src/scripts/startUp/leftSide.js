import { audioManager } from '../objects/audioManager';
import { createDifficultyPage } from '../pages/difficulty';

const createLeftSide = () => {
  let mainContainer = document.createElement('aside');
  let gameTitle = document.createElement('h1');

  let soloButton = document.createElement('button');
  let multiButton = document.createElement('button');

  gameTitle.innerText = 'Battle Ships';
  soloButton.innerText = 'Single Player';
  multiButton.innerText = 'Battle a Friend (TBA)';

  soloButton.addEventListener('click', singlePlayerButtonEvent);
  mainContainer.classList.add('startup-aside-left');

  mainContainer.append(gameTitle, soloButton, multiButton);
  return mainContainer;
};

const singlePlayerButtonEvent = () => {
  audioManager.playClickEffect();
  let startUpContent = document.querySelector('.startup-aside-left');
  let parent = startUpContent.parentElement;

  parent.replaceChild(createDifficultyPage(), startUpContent);
};
export { createLeftSide };
