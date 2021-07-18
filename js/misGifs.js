import { getGifTrending } from './trendingGifs.js';
import { startDarkMode } from './darkMode.js';
import { createCard } from './small_card.js';


var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);

getGifTrending();










let newGifbtn = document.getElementById('createGifbtn');
newGifbtn.addEventListener('mouseover', () => {
    newGifbtn.src = './recursos/CTA-crear-gifo-hover.svg'
});
newGifbtn.addEventListener('mouseout', () =>{
    newGifbtn.src = './recursos/CTA-crear-gifo-active.svg';
});
