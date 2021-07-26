function startDarkMode(mode) {
    var element = document.getElementById("dark-mode");
    if (mode == true) {
        element.classList.toggle("dark-mode");
    } else{
        element.classList.remove('dark-mode');
    }
    
}

const isDarkMode = () => {
    let darkMode;
    try {
        darkMode = JSON.parse(localStorage.getItem('isDarkMode'))
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
    let darkModeLi = document.getElementById('dark-mode-li');

    localStorage.setItem('isDarkMode', JSON.stringify(!mode));
    location.reload();
}
export{startDarkMode};