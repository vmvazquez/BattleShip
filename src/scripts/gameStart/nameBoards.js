import { gameStateManager } from '../objects/gameStateManager';

const nameBoards = () => {
  let enemyLabel = nameCard("Enemy's");
  let yourLabel = nameCard("Your's");

  let turn;

  if (gameStateManager.turn == 0) {
    turn = nameCard('Your Turn');
  } else {
    turn = nameCard('Enemy Turn');
  }

  let mainContent = document.querySelector('.main-content');

  turn.classList.add('turn-text');
  mainContent.firstChild.appendChild(enemyLabel);
  mainContent.lastChild.appendChild(yourLabel);

  document.body.insertBefore(turn, document.body.firstChild);
};

const nameCard = (name) => {
  let mainContainer = document.createElement('div');
  let p = document.createElement('p');

  p.innerText = name;
  mainContainer.append(p);
  return mainContainer;
};

export { nameBoards };
