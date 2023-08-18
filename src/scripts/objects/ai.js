module.exports = class AI {
  constructor() {
    this.remainingShips = [4, 3, 2, 2, 1, 2];
    this.alreadyHitIndices = [];
  }

  getNextMove = () => {
    let gameState = this.getFinalMatrix();
    console.log('board');
    this.printBoard(gameState);
    // Setting previously hit cells to negative 1 so
    // the will no longer be picked again
    this.alreadyHitIndices.forEach((index) => {
      gameState[index] = 0;
    });
    let maxValue = Math.max(...gameState);
    let pickedIndex = gameState.indexOf(maxValue);
    this.alreadyHitIndices.push(pickedIndex);
    return pickedIndex;
  };
  getFinalMatrix = () => {
    let board = this.getBoardState();

    let finalBoard = Array(100).fill(0);
    this.remainingShips.forEach((shipLength) => {
      let result = this.getMatrixResultForShip(board, shipLength);
      result.map((val, index) => {
        finalBoard[index] += val;
      });
    });
    return finalBoard;
  };
  getMatrixResultForShip = (board, shipLength) => {
    let horizontal = this.getShipPlacementsMatrixH(board, shipLength);
    let vertical = this.getShipPlacementsMatrixV(board, shipLength);

    let result = horizontal.map((val, index) => {
      return val + vertical[index];
    });
    return result;
  };
  /**
   * Obtains the player board and produces an array to match the board state.
   * Where 0 means open spot, 1 means ship hit cell and 2 means miss or sunk ship
   */
  getBoardState = () => {
    let cells = Array.from(
      document.querySelector('.right-side .grid-container .main-grid').children
    );

    let board = [];
    cells.forEach((cell) => {
      if (cell.matches('.open')) {
        board.push(0);
      } else if (cell.matches('.hit')) {
        board.push(1);
      } else {
        // Sunk ships or misses
        board.push(2);
      }
    });

    return board;
  };

  /**
   * Returns possible horizontal ship placement values given a board state
   * @param {Array} board Array filled with 0s,1s and 2s
   * @param {Int} shipLength Ship length
   * @returns {Array} Containing possible ship placements
   */
  getShipPlacementsMatrixH = (board, shipLength) => {
    let result = Array(board.length).fill(0);
    // check each index for ship placement
    for (let i = 0; i <= board.length - shipLength; i++) {
      let shipCells = board.slice(i, i + shipLength);
      let placementValues = this.handleShipPosition(shipCells);
      // making sure the cells are in the same row
      if (i % 10 < (i + shipLength - 1) % 10) {
        placementValues.forEach((value, index) => {
          result[i + index] += value;
        });
      }
    }
    return result;
  };
  /**
   * Returns possible vertical ship placement values given a board state
   * @param {Array} board Array filled with 0s,1s and 2s
   * @param {Int} shipLength Ship length
   * @returns {Array} Containing possible ship placements
   */
  getShipPlacementsMatrixV = (board, shipLength) => {
    let result = Array(board.length).fill(0);

    for (let i = 0; i < board.length - 10 * (shipLength - 1); i++) {
      // used to map from result array to board
      let verticalIndices = this.getVerticalCells(i, shipLength);

      // indices are within the board bounds
      if (verticalIndices != null) {
        let shipCells = board.map((cell, index) => {
          if (verticalIndices.includes(index)) {
            return cell;
          }
        });
        let placementValues = this.handleShipPosition(shipCells);

        verticalIndices.forEach((index) => {
          result[index] += placementValues[0];
        });
      }
    }

    return result;
  };
  printBoard = (board) => {
    let string = '';
    for (let i = 0; i < board.length; i++) {
      string += board[i] + '\t';
      if (i % 10 == 9) {
        string += '\n';
      }
    }
    console.log(string);
  };
  /**
   * Returns a list of indices where a ship can be placed based on the current starting
   * cell
   * @param {Int} index The current cell we are on from the game board
   * @param {Int} shipLength Ship Length
   * @returns {Array}  Array containing indices where ship can be placed
   */
  getVerticalCells = (index, shipLength) => {
    let arr = [];
    for (let i = 0; i < shipLength; i++) {
      if (index < 100) {
        arr.push(index);
      } else {
        return null;
      }
      index += 10;
    }

    return arr;
  };
  /**
   *
   * @param {Array} shipCells Array with positions that we are trying to place the ship on
   * @returns  [0]:  if we cannot place the ship
   *           [5]:  if we can place the ship & the ship is over an already hit target
   *           [1]:  if we can place a ship but it is on open water
   */
  handleShipPosition = (shipCells) => {
    // Not A valid placement so return -1
    if (shipCells.includes(2)) {
      return Array(shipCells.length).fill(0);
    } else if (shipCells.includes(1)) {
      let totalOverlaps = shipCells.filter((val) => val == 1).length;
      return Array(shipCells.length).fill(5 * totalOverlaps);
    } else {
      return Array(shipCells.length).fill(1);
    }
  };
};
