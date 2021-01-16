import { display } from './display.js';
import endSound from './sounds/TimoLaughSound.mp3';

const Timer = () => {
    let mode;
    let min;
    let sec;
    let timerId;
    let runningTimer = 0;
    let pomodoroCnt = 0;
    let taskCompleteCnt = 0;
    let singleTimer = false;

    //Preference Value
    let shouldAutoStartNextRound = true;
    let longBreakInterval = 2;

    const isRunningTimer = () => {
        return runningTimer;
    }

    const setSingleTimer = (state) => {
        singleTimer = state;
    }

    const initPomodoroCnt = () => {
        pomodoroCnt = 0;
    }

    const setTime = (modeState) => {
        mode = modeState;

        if (mode === 'pomodoroMode') {
            setTimeForPomodoroMode();
        } else if (mode === 'shortMode') {
            setTimeForShortMode();
        } else if (mode === 'longMode') {
            setTimeForLongMode();
        }

        applyTime();
    }

    const setTimeForPomodoroMode = () => {
        // min = 25;
        // sec = 0;
        min = 0;
        sec = 2;
    }

    const setTimeForShortMode = () => {
        // min = 5;
        // sec = 0;
        min = 0;
        sec = 3;
    }

    const setTimeForLongMode = () => {
        // min = 15;
        // sec = 0;
        min = 0;
        sec = 4;
    }

    const numFormat = (num) => {
        if (num < 10)
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
        if (state === 'start')
            stopTimer();
        else if (state === 'stop')
            timerId = setInterval(startTimer, 1000);
    }

    const nextTimer = () => {
        console.log(mode);
        if (singleTimer) {
            // Pomodoro Mode Start
            mode = 'pomodoroMode';
            setTimeForPomodoroMode();
            display.updateBtnToPomodoroMode(btnModeState());
            stopTimer();
            display.updateTimer(btnTimerState());
            singleTimer = false;
            return;
        }

        if (mode === 'pomodoroMode') {
            pomodoroCnt++;
            if (pomodoroCnt === longBreakInterval) {
                // Increase Task Count
                taskCompleteCnt++;

                // Long Break Start
                mode = 'longMode';
                setTimeForLongMode();
                display.updateBtnToLongMode(btnModeState());
            } else if (pomodoroCnt < longBreakInterval) {
                // Short Break Start
                mode = 'shortMode';
                setTimeForShortMode();
                display.updateBtnToShortMode(btnModeState());
            }
        } else if (mode === 'shortMode') {
            // Pomodoro Start
            mode = 'pomodoroMode';
            setTimeForPomodoroMode();
            display.updateBtnToPomodoroMode(btnModeState());
        } else if (mode === 'longMode') {
            // Pomodoro Start
            mode = 'pomodoroMode';
            setTimeForPomodoroMode();
            display.updateBtnToPomodoroMode(btnModeState());

            //Initialize pomodoroCnt
            pomodoroCnt = 0;
        }

        if(!shouldAutoStartNextRound) {
            stopTimer();
            display.updateTimer(btnTimerState());
        }

        console.log("pomodoroCnt: " + pomodoroCnt + " taskCompleteCnt: " + taskCompleteCnt);
    }

    const btnModeState = () => {
        let buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
            for (let i = 0; i < buttonList.length; i++) {
                let hasClassClickedMenu = buttonList[i].classList.contains('clickedBtn');
                if (hasClassClickedMenu)
                    return buttonList[i];
            }
    }

    const btnTimerState = () => {
        return document.getElementById('time').querySelector('input[type=button]');
    }

    const startTimer = () => {
        console.log("Start Timer!");
        runningTimer = true;
        sec--;
        if (sec === -1) {
            min--;
            sec = 59;
        }
        if (min === 0 && sec === 0) {
            console.log("Finished!!!");
            playEndSound();
            nextTimer();
            // clearInterval(timerId);
        }
        if (min === -1) {
            min = 0;
            sec = 0;
            stopTimer();
        }
        applyTime();
    }

    const stopTimer = () => {
        console.log("Stop Timer!");
        runningTimer = false;
        clearInterval(timerId);
    }

    const playEndSound = () => {
        let sound = new Audio(endSound);
        sound.volume = 1.0;
        sound.play();
    }

    return {
        setSingleTimer,
        initPomodoroCnt,
        isRunningTimer,
        btnTimerState,
        setTime,
        stopTimer,
        waitForTimer
    }
}

const timer = Timer();

export { timer }