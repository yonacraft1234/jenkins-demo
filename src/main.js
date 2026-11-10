import './style.css';
import { increment } from './counter.js';

const countEl = document.querySelector('#count');
const incrementButton = document.querySelector('#increment');
let count = 0;

incrementButton.addEventListener('click', () => {
  count = increment(count);
  countEl.textContent = String(count);
});
