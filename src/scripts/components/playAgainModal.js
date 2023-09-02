import { createShipPage } from '../pages/selectShips';
import { createStartUpPage } from '../startUp/startUpContent';

const createPlayAgain = () => {
  let backdrop = document.createElement('div');
  let modal = createPlayAgainModal();

  backdrop.classList.add('backdrop');
  backdrop.append(modal);

  return backdrop;
};

const createPlayAgainModal = () => {
  let mainContainer = document.createElement('div');

  let title = document.createElement('p');
  let yesButton = document.createElement('button');
  let noButton = document.createElement('button');
  let buttonLayout = document.createElement('div');
  mainContainer.classList.add('play-again-modal');

  title.innerText = 'Play Again?';

  yesButton.innerText = 'Yes';
  noButton.innerText = 'No';

  yesButton.addEventListener('click', () => {
    playAgainButtonEvent();
  });
  noButton.addEventListener('click', () => {
    goToMainMenu();
  });
  buttonLayout.append(yesButton, noButton);
  mainContainer.append(title, buttonLayout);

  return mainContainer;
};

const playAgainButtonEvent = () => {
  goToMainMenu();
  let shipPage = createShipPage();

  let mainContent = document.querySelector('.main-content');
  mainContent.replaceChild(shipPage, mainContent.firstChild);
};
const goToMainMenu = () => {
  removeModal();
  clearPlayingPageContent();
  let mainContent = document.querySelector('.main-content');

  mainContent.parentElement.removeChild(mainContent);
  document.body.append(createStartUpPage());
};
const clearPlayingPageContent = () => {
  let turnText = document.querySelector('.turn-text');

  let mainContent = document.querySelector('.main-content');

  while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild);
  }
  turnText.parentElement.removeChild(turnText);
};
const removeModal = () => {
  let backdrop = document.querySelector('.backdrop');

  backdrop.parentElement.removeChild(backdrop);
};
export { createPlayAgain };
