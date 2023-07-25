const createDifficultyPage = () => {
  let mainContainer = document.createElement('aside');
  let pageTitle = document.createElement('h1');

  let normalButton = document.createElement('button');
  let challengeButton = document.createElement('button');
  let diffDesc = document.createElement('p');
  diffDesc.innerText =
    'Some basic gameplay design to tell you some basic information about the difficulty';
  pageTitle.innerText = 'Difficulty';
  normalButton.innerText = 'Normal';
  challengeButton.innerText = 'Challenge';

  mainContainer.append(pageTitle, normalButton, challengeButton, diffDesc);
  mainContainer.classList.add('difficulty-aside');
  return mainContainer;
};

export { createDifficultyPage };
