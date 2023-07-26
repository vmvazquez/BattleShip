import { createShipCard } from './shipCard.js';
import lgShip from '../../res/ships/lg-ship.png';
import mediumShip1 from '../../res/ships/md-ship-1.png';
import mediumShip2 from '../../res/ships//md-ship-2.png';

import smMediumShip from '../../res/ships/sm-md-ship.png';
import smShip from '../../res/ships/sm-ship.png';
import sub from '../../res/ships/sub.png';
const createShipGrid = () => {
  let mainContainer = document.createElement('div');
  let sectionTitle = document.createElement('p');

  let shipGrid = document.createElement('div');

  sectionTitle.innerText = 'Drag & Drop';

  let ships = [lgShip, mediumShip1, mediumShip2, smMediumShip, smShip, sub];

  let healthCount = [4, 3, 2, 2, 1, 2];
  let descArr = [
    'Carrier',
    'Cruiser',
    'Destroyer',
    'BattleShip',
    'Patrol',
    'Submarine',
  ];
  ships.forEach((shipImg, i) => {
    let card = createShipCard(healthCount[i], shipImg, descArr[i]);
    shipGrid.append(card);
  });
  shipGrid.classList.add('ship-grid');
  mainContainer.append(sectionTitle, shipGrid);
  mainContainer.classList.add('ship-info');
  return mainContainer;
};

export { createShipGrid };
