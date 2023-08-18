const AI = require('../scripts/objects/ai');
let array;
let ai;
let board;
beforeAll(() => {
  array = Array(10).fill(0);
  ai = new AI();
  board = Array(100).fill(0);
  board[40] = 1;
  board[50] = 2;
  board[60] = 1;
});
// test('Testing test', () => {
//   expect(ai.getShipPlacementsMatrixH(array, 4)).toEqual([
//     1, 2, 3, 4, 4, 4, 4, 3, 2, 1,
//   ]);
// });
test('Testing valid arguments for vertical cells', () => {
  expect(ai.getVerticalCells(69, 4)).toEqual([69, 79, 89, 99]);
});
test('Testing invalid arguments for vertical cells', () => {
  expect(ai.getVerticalCells(79, 4)).toEqual(null);
});

test('Testing get Vertical Cells', () => {
  expect(ai.getShipPlacementsMatrixV(board, 4)).toEqual([0]);
});
