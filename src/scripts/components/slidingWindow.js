const createSlidingWindow = () => {
  let windowContainer = document.createElement('div');

  windowContainer.classList.add('sliding-window');
  return windowContainer;
};

export { createSlidingWindow };
