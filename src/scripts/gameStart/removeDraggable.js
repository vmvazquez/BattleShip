import circle from '../../res/icons/circle-small-custom.png';
import { drawShipPlacementPreview } from '../components/mainGrid';

const removeDraggable = () => {
  removeDraggableFromImages();
  removeDragEnterFromCells();
};

const removeDraggableFromImages = () => {
  let images = Array.from(document.querySelectorAll('img'));

  images.forEach((img) => {
    img.classList.remove('draggable');
    img.draggable = false;
  });
};
const removeDragEnterFromCells = () => {
  let cells = Array.from(document.querySelectorAll('.main-grid > div'));

  console.log('cell lenght');
  console.log(cells.length);
  cells.forEach((cell) => {
    cell.removeEventListener('dragenter', drawShipPlacementPreview);
    cell.addEventListener('click', cellClick);
  });
};
const cellClick = (e) => {
  let cell = e.target;
  let img = document.createElement('img');
  img.src = circle;
  cell.classList.add('cell-miss');
  cell.append(img);

  cell.removeEventListener('click', cellClick);
};
export { removeDraggable };
