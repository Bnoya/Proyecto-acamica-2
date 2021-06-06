var botton = document.getElementById("dark-mode");
botton.addEventListener("click", startDarkMode, true);
function startDarkMode() {
    var element = document.getElementById("dark-mode");
    element.classList.toggle("dark-mode");
}
