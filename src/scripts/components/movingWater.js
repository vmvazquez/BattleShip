import background from '../../res/water.jpg';
import scaled from '../../res/scaled_water.jpg';

function createMovingBackground() {
  const element = document.createElement('div');

  element.classList.add('background-box');

  let img = document.createElement('img');

  img.src = scaled;

  element.append(img);

  return element;
}

export { createMovingBackground };
