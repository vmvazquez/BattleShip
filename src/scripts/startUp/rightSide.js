import { createGrid } from '../components/mainGrid';
import { createSlidingWindow } from '../components/slidingWindow';
import { mainGridObserverCallback } from '../eventMethods/mutationObservers';
const createRightSide = () => {
  let gridContainer = document.createElement('div');
  let mainContainer = document.createElement('aside');

  gridContainer.classList.add('grid-container');

  let slidingWindow = createSlidingWindow();
  let grid = createGrid();

  // mutation observer to watch for added children
  const observer = new MutationObserver(mainGridObserverCallback);
  const config = { childList: true, subtree: true };
  observer.observe(gridContainer, config);

  gridContainer.append(slidingWindow, grid);

  mainContainer.append(gridContainer);

  mainContainer.classList.add('right-side');
  return mainContainer;
};

export { createRightSide };
