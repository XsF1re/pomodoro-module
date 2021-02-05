import { display } from './display.js';
import endSound from './sounds/alertSound.mp3';
import Setting from "./setting";

const Timer = () => {
    let mode;
    let min;
    let sec;
    let timerId;
    let runningTimer = false;
    let pomodoroRunCnt = 0;
    let taskCompleteCnt = 0;
    let singleTimer = false;

    //Preference Value
    const autoStartNextRound = true;
    const longBreakInterval = 2;

    const listenSettings = () => {
        const submitButton = document.getElementsByClassName("footer__submit-btn")[0];
        submitButton.addEventListener("click", importSettings, false);
    }

    const importSettings = () => {
        const pomodoroSetting = new Setting();
        console.log(pomodoroSetting.get().pomodoro);
        setTimeForPomodoroMode(pomodoroSetting.get().pomodoro, 0);
        // setTimeForShortMode(pomodoroSetting.get().shortBreak, 0);
        // setTimeForLongMode(pomodoroSetting.get().longbreak, 0);
        applyTime();
    }

    const debugStatus = () => {
        console.log("autoStartNextRound: " + autoStartNextRound + ", longBreakInterval: " + longBreakInterval);
    }

    const isRunningTimer = () => {
        return runningTimer;
    }

    const setSingleTimer = (state) => {
        singleTimer = state;
    }

    const isSingleTimer = () => {
        return singleTimer;
    }

    const initPomodoroRunCnt = () => {
        pomodoroRunCnt = 0;
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

    const setTimeForPomodoroMode = (m=25, s=0) => {
        const red = "rgb(219, 82, 77)";
        document.body.style.backgroundColor = red;
        document.getElementById('time').querySelectorAll('input[type=button]')[0].style.color = red;
        document.getElementById('time').querySelectorAll('input[type=button]')[0].style.boxShadow = 'rgb(235 235 235) 0px 6px 0px';
        min = m;
        sec = s;
    }

    const setTimeForShortMode = (m=5, s=0) => {
        const green = "rgb(70, 142, 145)";
        document.body.style.backgroundColor = green;
        document.getElementById('time').querySelectorAll('input[type=button]')[0].style.color = green;
        min = m;
        sec = s;
    }

    const setTimeForLongMode = (m=15, s=0) => {
        const blue = "rgb(67, 126, 168)";
        document.body.style.background = blue;
        document.getElementById('time').querySelectorAll('input[type=button]')[0].style.color = blue;
        min = m;
        sec = s;
    }

    const numFormat = (num) => {
        if (num < 10)
            num = "0" + num;
        return num;
    }

    const applyTime = () => {
        const timeString = numFormat(min) + ':' + numFormat(sec);
        document.getElementById('time').querySelector('h1').innerText = timeString;
    }

    const waitForTimer = () => {
        const btn = document.getElementById('time').querySelectorAll('input[type=button]');
        btn.forEach((button) => {
            button.addEventListener('click', () => {
                debugStatus();
                display.updateTimer(button);
                Timer(button.value);
            })
        })
    }

    const Timer = (state) => {
        if (state === 'START')
            stopTimer();
        else if (state === 'STOP')
            timerId = setInterval(startTimer, 1000);
    }

    const nextTimer = () => {
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
            pomodoroRunCnt++;
            if (pomodoroRunCnt === longBreakInterval) {
                // Increase Task Count
                taskCompleteCnt++;
                console.log("taskCompleteCnt: " + taskCompleteCnt);

                // Long Break Start
                mode = 'longMode';
                setTimeForLongMode();
                display.updateBtnToLongMode(btnModeState());
            } else if (pomodoroRunCnt < longBreakInterval) {
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

            //Initialize pomodoroRunCnt
            pomodoroRunCnt = 0;
        }

        if(!autoStartNextRound) {
            stopTimer();
            display.updateTimer(btnTimerState());
        }
    }

    const btnModeState = () => {
        const buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
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
        runningTimer = true;
        sec--;
        if (sec === -1) {
            min--;
            sec = 59;
        }
        if (min === 0 && sec === 0) {
            playEndSound();
            nextTimer();
        }
        if (min === -1) {
            min = 0;
            sec = 0;
            stopTimer();
        }
        applyTime();
    }

    const stopTimer = () => {
        runningTimer = false;
        clearInterval(timerId);
    }

    const playEndSound = () => {
        const sound = new Audio(endSound);
        sound.volume = 1.0;
        sound.play();
    }

    return {
        listenSettings,
        setSingleTimer,
        isSingleTimer,
        initPomodoroRunCnt,
        isRunningTimer,
        btnTimerState,
        setTime,
        stopTimer,
        waitForTimer
    }
}

const timer = Timer();

export { timer }