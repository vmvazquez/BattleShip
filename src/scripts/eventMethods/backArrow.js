/**
 *
 * @param {Element} e The event created by the event handler
 * @param {Function} methodToCreateNewContent call back function that will be used
 * to create new content to replace old content.
 */
const backArrowEvent = (e, methodToCreateNewContent) => {
  // let diffContent = document.querySelector('.difficulty-aside');
  let diffContent = e.target.parentElement;
  let parent = diffContent.parentElement;

  let leftSide = e.target.parentElement.matches('.select-aside');
  if (leftSide) {
    let rightSide = document.querySelector('.right-side');
    rightSide.removeChild(rightSide.lastChild);
  }
  parent.replaceChild(methodToCreateNewContent(), diffContent);
};

export { backArrowEvent };
