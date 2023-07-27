import './styles/style.css';
import { createStartUpPage } from './scripts/startUp/startUpContent';

document.body.append(createStartUpPage());
// document.body.appendChild(createMovingBackground());
document.addEventListener('click', (e) => {
  console.log(e.target.getBoundingClientRect());
});
