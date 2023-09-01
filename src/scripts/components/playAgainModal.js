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

  buttonLayout.append(yesButton, noButton);
  mainContainer.append(title, buttonLayout);

  return mainContainer;
};

export { createPlayAgain };
