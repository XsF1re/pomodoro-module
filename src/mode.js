import { timer } from './timer.js';
import { display } from './display.js';

const Mode = () => {
    const setDefaultMode = () => {
        timer.setTime('pomodoroMode');
    }

    const waitForMode = () => {
        let btn = document.getElementById('mode').querySelectorAll('input[type=button]');
        btn.forEach((button) => {
            button.addEventListener('click', () => {
                display.updateMode(button);
                timer.setTime(button.name);
            })
        })
    }

    return {
        setDefaultMode,
        waitForMode
    }
}

const mode = Mode();
export { mode }