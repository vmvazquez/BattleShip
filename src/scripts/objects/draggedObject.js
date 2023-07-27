const createDraggedObject = (shipCard) => {
  let health = Array.from(
    shipCard.querySelector('.health-bar').children
  ).length;
  let img = shipCard.firstChild.nextSibling;

  return { health, img };
};
export { createDraggedObject };
