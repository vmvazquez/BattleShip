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
