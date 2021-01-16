import { display } from './display.js';
import endSound from './sounds/TimoLaughSound.mp3';

const Timer = () => {
    let min;
    let sec;
    let timerId;

    const setTime = (mode) => {
        if (mode === 'pomodoroMode') {
            setTimeForPomodoMode();
        } else if (mode === 'shortMode') {
            setTimeForShortMode();
        } else if (mode === 'longMode') {
            setTimeForLongMode();
        }

        applyTime();
    }

    const setTimeForPomodoMode = () => {
        min = 25;
        sec = 0;
    }

    const setTimeForShortMode = () => {
        min = 5;
        sec = 0;
    }

    const setTimeForLongMode = () => {
        min = 15;
        sec = 0;
    }

    const numFormat = (num) => {
        if(num < 10)
            num = "0" + num;
        return num;
    }

    const applyTime = () => {
        let timeString = numFormat(min) + ' : ' + numFormat(sec);
        document.getElementById('time').querySelector('h1').innerText = timeString;
    }

    const waitForTimer = () => {
        let btn = document.getElementById('time').querySelectorAll('input[type=button]');
        btn.forEach((button) => {
            button.addEventListener('click', () => {
                display.updateTimer(button);
                Timer(button.value);
            })
        })
    }

    const Timer = (state) => {
        if(state === 'start')
            stopTimer();
        else if(state === 'stop')
            timerId = setInterval(startTimer, 1000);
    }

    const startTimer = () => {
        console.log("Start Timer!");
        sec--;
        if(sec === -1) {
            min--;
            sec = 59;
        }
        if(min === 0 && sec === 0) {
            console.log("Finished!!!");
            let sound = new Audio(endSound);
            sound.play();
            clearInterval(timerId);
        }
        applyTime();
    };

    const stopTimer = () => {
        console.log("Stop Timer!");
        clearInterval(timerId);
    }

    return {
        setTime,
        waitForTimer
    }
}

const timer = Timer();

export { timer }