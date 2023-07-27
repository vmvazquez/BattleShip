import { draggedObject } from './mainGrid';
const createShipImage = (shipImgSrc) => {
  let boatImage = document.createElement('img');
  boatImage.src = shipImgSrc;
  boatImage.draggable = 'true';
  boatImage.addEventListener('dragstart', (e) => {
    console.log(e.clientX);
    boatImage.classList.add('dragging');
  });
  boatImage.addEventListener('dragend', () => {
    console.log(draggedObject);
    // console.log('dragend');
    boatImage.classList.remove('dragging');
    let hoveredCell = document.querySelector('.hovered-cell');
    if (hoveredCell) {
      drawImageOnBoard(boatImage);
      if (boatImage.parentElement.matches('.grid-container')) {
        boatImage.parentElement.removeChild(boatImage);
      }
    }
  });
  boatImage.classList.add('draggable');

  return boatImage;
};
const drawImageOnBoard = (imageSrc) => {
  let gridContainer = document.querySelector('.grid-container');

  let newImage = createShipImage(imageSrc);
  newImage.src = imageSrc.src;

  let hoveredCell = document.querySelector('.hovered-cell');

  console.log('image Source');
  console.log(imageSrc.getBoundingClientRect());
  let parent = hoveredCell.parentElement;
  let newLeft =
    hoveredCell.getBoundingClientRect().left -
    parent.getBoundingClientRect().left -
    imageSrc.getBoundingClientRect().width / 2;
  let newTop =
    hoveredCell.getBoundingClientRect().top -
    parent.getBoundingClientRect().top;

  newImage.style.setProperty('left', `${newLeft}px`);
  newImage.style.setProperty('top', `${newTop}px`);
  gridContainer.append(newImage);
};
export { createShipImage };
