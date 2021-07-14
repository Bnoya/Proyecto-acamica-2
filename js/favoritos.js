/* añadir favoritos- recibe un id y lo almacena en el localStorage
eliminar */
import { createCard } from './small_card.js';
import { getGifTrending } from './trendingGifs.js';
import { startDarkMode } from './darkMode.js';

var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);

function getfavs (){
        let fav = localStorage.getItem('favIDs');
        let favs= JSON.parse(fav);
        if (favs ===null) {
            localStorage.setItem('favIDs', JSON.stringify([]));
            fav = localStorage.getItem('favIDs');
            favs= JSON.parse(fav);
        }
        return (favs);
    } 
    function setfavs (id){
        let favs = getfavs();
        if (favs== null) {
            favs = [];
        }
        favs.push(id);
        localStorage.setItem('favIDs', JSON.stringify((favs)));
    }
    const removeFav = (id) => {
        let favs = getfavs();
        const index = favs.indexOf(id);
        if (index> -1) {
            favs.splice(index, 1);
        }
        localStorage.setItem('favIDs', JSON.stringify((favs)));
    }

getGifTrending();

/* renderizar gifs. primero tengo qeu obtener el gif apartir de ID */

async function getGifFavorite() { 
    try{
        const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
        let favs = getfavs();
        console.log(favs);
        let more = document.getElementById('btn');
        let cont = document.getElementById('favorites_display'); 
        let url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${favs}`;
        const response = await fetch(url);
        const data = await response.json();
        for (let index = 0; index < 12; index++) {
                createCard(data ,index, cont);
            }
        more.addEventListener('click', (index) => {
            for (let index = 12; index < favs.length; index++) {
                createCard(data ,index, cont);
            }
            more.style.display = 'none';
        })
    
    } catch (err) {
    console.log('Error');    
    }
}

getGifFavorite();

export {getfavs, setfavs, removeFav};