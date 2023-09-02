import darkBlue from '../../res/svgs/darkBlue.svg';
import brown from '../../res/svgs/brown.svg';
import green from '../../res/svgs/green.svg';
import magenta from '../../res/svgs/magenta.svg';
import red from '../../res/svgs/red.svg';
import seaBlue from '../../res/svgs/seaBlue.svg';
import torquoise from '../../res/svgs/torquoise.svg';
import yellow from '../../res/svgs/yellow.svg';

const createColor = () => {
  let mainContainer = document.createElement('div');

  let title = document.createElement('p');

  title.innerText = 'Select Color (TBA)';
  let colors = [
    darkBlue,
    brown,
    green,
    magenta,
    red,
    seaBlue,
    torquoise,
    yellow,
  ];
  let colorDiv = document.createElement('div');
  colors.forEach((color) => {
    let circlesContainer = document.createElement('img');
    circlesContainer.src = color;
    colorDiv.append(circlesContainer);
  });

  mainContainer.append(title, colorDiv);
  mainContainer.classList.add('color-section');
  return mainContainer;
};
export { createColor };
