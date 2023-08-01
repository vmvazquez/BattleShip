import lgShip from '../../res/ships/lg-ship.png';
import mediumShip1 from '../../res/ships/md-ship-1.png';
import mediumShip2 from '../../res/ships//md-ship-2.png';

import smMediumShip from '../../res/ships/sm-md-ship.png';
import smShip from '../../res/ships/sm-ship.png';
import sub from '../../res/ships/sub.png';
let shipImageArr = [
  lgShip,
  mediumShip1,
  mediumShip2,
  smMediumShip,
  smShip,
  sub,
];

let healthCountArr = [4, 3, 2, 2, 1, 2];
let descArr = [
  'Carrier',
  'Cruiser',
  'Destroyer',
  'BattleShip',
  'Patrol',
  'Submarine',
];

let healthMap = new Map();

shipImageArr.forEach((img, i) => {
  healthMap.set(img, healthCountArr[i]);
});
export { shipImageArr, healthCountArr, descArr, healthMap };
