const methods = require('../scripts/aiLogic/generateShipPosition.js');

/***************************  Start of East position generation  ***********************************/
test('Testing East placement starting position', () => {
  let positions = methods.getContinuousLocationsEast(0, 0, 4);

  let expected = [0, 1, 2, 3];

  expect(positions).toEqual(expected);
});
test('Testing right bound of East Placement', () => {
  let positions = methods.getContinuousLocationsEast(0, 6, 4);

  let expected = [6, 7, 8, 9];

  expect(positions).toEqual(expected);
});

test('Testing right out of bounds of East Placement', () => {
  let positions = methods.getContinuousLocationsEast(0, 7, 4);

  let expected = null;

  expect(positions).toEqual(expected);
});
/***************************  End of East position generation  ***********************************/

/***************************  Start of West position generation  ***********************************/
test('Testing West left out of bounds ', () => {
  let positions = methods.getContinuousLocationsWest(0, 0, 4);

  let expected = null;

  expect(positions).toEqual(expected);
});
test('Testing West left bound ', () => {
  let positions = methods.getContinuousLocationsWest(0, 3, 4);

  let expected = [0, 1, 2, 3];

  expect(positions).toEqual(expected);
});
/***************************  End of West position generation  ***********************************/

/***************************  Start of North position generation  ***********************************/
test('Testing North top bound ', () => {
  let positions = methods.getContinuousLocationsNorth(3, 2, 4);

  let expected = [2, 12, 22, 32];

  expect(positions).toEqual(expected);
});

test('Testing North out of bounds ', () => {
  let positions = methods.getContinuousLocationsNorth(2, 2, 4);

  let expected = null;

  expect(positions).toEqual(expected);
});
/***************************  End of North position generation  ***********************************/

/***************************  Start of South position generation  ***********************************/
test('Testing South bottom bound ', () => {
  let positions = methods.getContinuousLocationsSouth(6, 2, 4);

  let expected = [62, 72, 82, 92];

  expect(positions).toEqual(expected);
});

test('Testing South out of bounds ', () => {
  let positions = methods.getContinuousLocationsSouth(7, 2, 4);

  let expected = null;

  expect(positions).toEqual(expected);
});
/***************************  End of South position generation  ***********************************/

/***************************  Start of Horizontal Shell Testing  ***********************************/

// test('Testing North out of bounds ', () => {
//   let positions = methods.getContinuousLocationsSouth(7, 2, 4);

//   let expected = null;

//   expect(positions).toEqual(expected);
// });

test('Testing vertical left shell unavailable ', () => {
  let positions = methods.getContinuousLocationsWest(3, 3, 4);
  let shell = methods.getHorizontalShell(positions);
  let expected = [20, 21, 22, 23, 24, 34, 40, 41, 42, 43, 44];
  // let expected = [30, 31, 32, 33];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
test('Testing vertical right & bottom shell unavailable ', () => {
  let positions = methods.getContinuousLocationsEast(9, 6, 4);
  let shell = methods.getHorizontalShell(positions);
  let expected = [85, 86, 87, 88, 89, 95];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing vertical left & bottom shell unavailable ', () => {
  let positions = methods.getContinuousLocationsEast(9, 0, 4);
  let shell = methods.getHorizontalShell(positions);
  let expected = [80, 81, 82, 83, 84, 94];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing vertical left & top shell unavailable ', () => {
  let positions = methods.getContinuousLocationsEast(0, 0, 4);
  let shell = methods.getHorizontalShell(positions);
  let expected = [4, 10, 11, 12, 13, 14];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
test('Testing vertical right & top shell unavailable ', () => {
  let positions = methods.getContinuousLocationsEast(0, 6, 4);
  let shell = methods.getHorizontalShell(positions);
  let expected = [5, 15, 16, 17, 18, 19];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
test('Testing single cell all available ', () => {
  let positions = methods.getContinuousLocationsEast(4, 4, 1);
  let shell = methods.getHorizontalShell(positions);
  let expected = [33, 34, 35, 43, 45, 53, 54, 55];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
/***************************  End of Horizontal Shell Testing  ***********************************/

/***************************  Start of Vertical Shell Testing  ***********************************/
test('Testing horizontal left & top shell unavailable ', () => {
  let positions = methods.getContinuousLocationsSouth(0, 0, 4);
  let shell = methods.getVerticalShell(positions);
  let expected = [1, 11, 21, 31, 40, 41];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing horizontal right & top shell unavailable ', () => {
  let positions = methods.getContinuousLocationsSouth(0, 9, 4);
  let shell = methods.getVerticalShell(positions);
  let expected = [8, 18, 28, 38, 48, 49];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
test('Testing horizontal right & bot shell unavailable ', () => {
  let positions = methods.getContinuousLocationsSouth(6, 9, 4);
  let shell = methods.getVerticalShell(positions);
  let expected = [58, 59, 68, 78, 88, 98];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing horizontal left & bot shell unavailable ', () => {
  let positions = methods.getContinuousLocationsSouth(6, 0, 4);
  let shell = methods.getVerticalShell(positions);
  let expected = [50, 51, 61, 71, 81, 91];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing all shell available ', () => {
  let positions = methods.getContinuousLocationsSouth(4, 4, 4);
  let shell = methods.getVerticalShell(positions);
  let expected = [33, 34, 35, 43, 45, 53, 55, 63, 65, 73, 75, 83, 84, 85];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});

test('Testing single cell all available ', () => {
  let positions = methods.getContinuousLocationsSouth(4, 4, 1);
  let shell = methods.getVerticalShell(positions);
  let expected = [33, 34, 35, 43, 45, 53, 54, 55];
  // let expected = [96, 97, 98, 99];
  // expect(positions).toEqual(expected);
  expect(shell).toEqual(expected);
});
/***************************  End of Vertical Shell Testing  ***********************************/
