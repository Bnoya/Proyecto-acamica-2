import { getGifTrending } from './trendingGifs.js';
import { startDarkMode } from './darkMode.js';
import { createCard } from './small_card.js';


var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);

getGifTrending();

