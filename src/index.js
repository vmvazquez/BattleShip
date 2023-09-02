import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';
import {
  resizeImagesOnSideGrid,
  resizeAndCenterHorShipsOnField,
} from './scripts/objects/imageHandler';
import { createPlayAgain } from './scripts/components/playAgainModal';
import { audioManager } from './scripts/objects/audioManager';

audioManager.backgroundSound.volume = 0.4;
document.body.append(createStartUpPage());

window.addEventListener('resize', (e) => {
  resizeImagesOnSideGrid();
  resizeAndCenterHorShipsOnField();
});
