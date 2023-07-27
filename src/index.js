import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';

document.body.append(createStartUpPage());
// document.body.appendChild(createMovingBackground());
document.addEventListener('click', (e) => {
  console.log(e.target.getBoundingClientRect());
});

//TODO change the size of ship images based on grid
window.addEventListener('resize', (e) => {
  // console.log('resizing');
});
