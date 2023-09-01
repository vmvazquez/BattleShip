import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';
import {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
} from './scripts/objects/imageHandler';
import { createPlayAgain } from './scripts/components/playAgainModal';

document.body.append(createStartUpPage());

window.addEventListener('resize', (e) => {
  resizeImagesOnSideGrid();
  resizeAndCenterHorShipsOnField();
});
