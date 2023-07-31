import {
  shipImageArr,
  healthCountArr,
  descArr,
} from '../objects/shipArrays.js';
import { createShipCard } from './shipCard.js';

const createShipGrid = () => {
  let mainContainer = document.createElement('div');
  let sectionTitle = document.createElement('p');

  let shipGrid = document.createElement('div');

  sectionTitle.innerText = 'Drag & Drop';

  shipImageArr.forEach((shipImg, i) => {
    let card = createShipCard(healthCountArr[i], shipImg, descArr[i]);
    shipGrid.append(card);
  });
  shipGrid.classList.add('ship-grid');
  mainContainer.append(sectionTitle, shipGrid);
  mainContainer.classList.add('ship-info');
  return mainContainer;
};

export { createShipGrid };
