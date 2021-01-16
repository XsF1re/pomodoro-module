const Display = () => {
    const updateMode = (button) => {
        let buttonList = document.getElementById('mode').querySelectorAll('input[type=button]');
            for (let i = 0; i < buttonList.length; i++) {
                let hasClassClickedMenu = buttonList[i].classList.contains('clicked_menu');
                if (hasClassClickedMenu)
                    buttonList[i].classList.remove('clicked_menu');
            }
        button.classList.add('clicked_menu');
    }

    const updateTimer = (button) => {
        if(button.value === "start")
            button.value = 'stop';
        else if(button.value === 'stop')
            button.value = 'start';
    }

    return {
        updateMode,
        updateTimer
    }
}

const display = Display();

export { display }