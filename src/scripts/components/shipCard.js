import heart from '../../res/icons/heart.png';
import { createShipImage } from './shipImage';

/**
 *
 * @param {Integer} healthCount The total hit points for a ship
 * @param {Object} shipImgSrc Actual ship variable src obtained from import statement.
 * @param {String} desc Contains name of ship and the number of these kind of ships available
 * @returns {Element} ship card
 */
const createShipCard = (healthCount, shipImgSrc, desc) => {
  let mainContainer = document.createElement('div');
  let healthBarContainer = createHealthContainer(healthCount);
  let boatImage = createShipImage(healthCount, shipImgSrc);
  let description = document.createElement('p');

  description.innerText = desc;
  mainContainer.classList.add('ship-card');
  mainContainer.append(healthBarContainer, boatImage, description);
  return mainContainer;
};

const createHealthContainer = (healthCount) => {
  let mainContainer = document.createElement('div');
  mainContainer.classList.add('health-bar');
  for (let i = 0; i < healthCount; i++) {
    let img = document.createElement('img');
    img.src = heart;
    mainContainer.append(img);
  }
  return mainContainer;
};

export { createShipCard };
