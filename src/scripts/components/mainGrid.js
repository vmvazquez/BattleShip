let draggedObject;
const createGrid = () => {
  let mainContainer = document.createElement('div');
  let backgroundGrid = document.createElement('div');

  backgroundGrid.classList.add('background-grid');
  mainContainer.classList.add('main-grid');

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');

    cell.addEventListener('dragenter', (e) => {
      let previouslyHoveredCell = document.querySelectorAll('.hovered-cell');

      if (previouslyHoveredCell) {
        Array.from(previouslyHoveredCell).forEach((cell) => {
          cell.classList.remove('hovered-cell');
        });
      }

      let previousOverlap = document.querySelectorAll('.overlap-cell');
      if (previousOverlap) {
        Array.from(previousOverlap).forEach((cell) => {
          cell.classList.remove('overlap-cell');
        });
      }

      cell.classList.add('hovered-cell');
      cell.previousSibling.classList.add('overlap-cell');
      cell.previousSibling.previousSibling.classList.add('overlap-cell');

      // let cellXMid =
      //   cell.getBoundingClientRect().x + cell.getBoundingClientRect().width / 2;
      // let cellYMid =
      //   cell.getBoundingClientRect().y +
      //   cell.getBoundingClientRect().height / 2;
      // console.log(cellXMid);
      // console.log(cellYMid);
    });

    mainContainer.append(cell);
  }
  backgroundGrid.append(mainContainer);
  return mainContainer;
};

export { createGrid, draggedObject };
