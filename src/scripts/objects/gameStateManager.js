const createGameStateManager = () => {
  let turn = 0;

  let thisPlayerShipMap = new Map();
  let opponentShipMap = new Map();

  return { turn, thisPlayerShipMap, opponentShipMap };
};

export { createGameStateManager };
