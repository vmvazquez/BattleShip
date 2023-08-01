import { generateAIShipLocations } from '../aiLogic/generateShipPosition';

const createGameBoardManager = () => {
  let map = new Map();

  let { finalPositions: cpuShipLocations, directions: cpuDirections } =
    generateAIShipLocations();
  let firstPLayerShipLocations = [];
  let directionMap = new Map();
  directionMap.set(0, 'north');
  directionMap.set(1, 'east');
  directionMap.set(2, 'south');
  directionMap.set(3, 'west');
  return {
    map,
    cpuShipLocations,
    cpuShipLocations,
    directionMap,
    firstPLayerShipLocations,
  };
};
let gameBoardManager = createGameBoardManager();
export { gameBoardManager };
