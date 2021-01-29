import { mode } from './mode.js';
import { timer } from './timer.js';
// import { settings } from './setting.js';
import './css/style.css';

mode.setDefaultMode();

mode.waitForMode();
timer.waitForTimer();