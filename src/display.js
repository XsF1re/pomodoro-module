const Display = () => {
    const updateMode = (button) => {
        const buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
            for (let i = 0; i < buttonList.length; i++) {
                let hasClassClickedMenu = buttonList[i].classList.contains('clickedBtn');
                if (hasClassClickedMenu)
                    buttonList[i].classList.remove('clickedBtn');
            }
        button.classList.add('clickedBtn');
    }

    const updateBtnToPomodoroMode = (button) => {
        button.classList.remove('clickedBtn');
        const buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
        for (let i = 0; i < buttonList.length; i++) {
            if(buttonList[i].name === 'pomodoroMode') {
                buttonList[i].classList.add('clickedBtn');
                break;
            }
        }
    }

    const updateBtnToShortMode = (button) => {
        button.classList.remove('clickedBtn');
        const buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
        for (let i = 0; i < buttonList.length; i++) {
            if(buttonList[i].name === 'shortMode') {
                buttonList[i].classList.add('clickedBtn');
                break;
            }
        }
    }

    const updateBtnToLongMode = (button) => {
        button.classList.remove('clickedBtn');
        const buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
        for (let i = 0; i < buttonList.length; i++) {
            if(buttonList[i].name === 'longMode') {
                buttonList[i].classList.add('clickedBtn');
                break;
            }
        }
    }

    const updateTimer = (button) => {
        if(button.value === "start")
            button.value = 'stop';
        else if(button.value === 'stop')
            button.value = 'start';
    }

    return {
        updateMode,
        updateBtnToPomodoroMode,
        updateBtnToShortMode,
        updateBtnToLongMode,
        updateTimer
    }
}

const display = Display();

export { display }