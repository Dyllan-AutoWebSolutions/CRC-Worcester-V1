/* ============================================================
   CRC WORCESTER — main.js
   Entry point — imports and initialises all modules
   ============================================================ */

import { initNav } from './nav.js';
import { initReveal } from './reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
});
