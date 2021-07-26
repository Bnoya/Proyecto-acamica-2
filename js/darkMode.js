function startDarkMode(mode) {
    var element = document.getElementById("dark-mode");
    console.log('entre a startDarkmode')
    if (mode == true) {
        console.log('mode True');
        element.setAttribute('class', 'dark-mode');
    } else{
        console.log('mode Flase');
        element.classList.remove('dark-mode');
    }
    
}

const isDarkMode = () => {
    let darkMode;
    try {
        darkMode = JSON.parse(localStorage.getItem('isDarkMode'))
        console.log('darkmode es ' + darkMode);
        if (darkMode === null) {
            return false
        }
    } catch {
        return false
    }
    return darkMode;
}

const toggleDarkMode = () => {
    let mode = isDarkMode();

    localStorage.setItem('isDarkMode', JSON.stringify(!mode));
    location.reload();
}

export{startDarkMode, isDarkMode, toggleDarkMode};