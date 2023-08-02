import lgShip from '../../res/ships/lg-ship.png';
import mediumShip1 from '../../res/ships/md-ship-1.png';
import mediumShip2 from '../../res/ships//md-ship-2.png';

import smMediumShip from '../../res/ships/sm-md-ship.png';
import smShip from '../../res/ships/sm-ship.png';
import sub from '../../res/ships/sub.png';

import verticalLgShip from '../../res/ships/vertical-lg-ship.png';
import verticalMediumShip1 from '../../res/ships/vertical-md-ship-1.png';
import verticalMediumShip2 from '../../res/ships//vertical-md-ship-2.png';
import verticalSmMediumShip from '../../res/ships/vertical-sm-md-ship.png';
import verticalSmShip from '../../res/ships/vertical-sm-ship.png';
import verticalSub from '../../res/ships/vertical-sub.png';

let verticalImageArr = [
  verticalLgShip,
  verticalMediumShip1,
  verticalMediumShip2,
  verticalSmMediumShip,
  verticalSmShip,
  verticalSub,
];

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
export { shipImageArr, healthCountArr, descArr, healthMap, verticalImageArr };
