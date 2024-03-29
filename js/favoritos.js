/* añadir favoritos- recibe un id y lo almacena en el localStorage
eliminar */
import { createCard } from './small_card.js';
import { getGifTrending } from './trendingGifs.js';
import { startDarkMode, toggleDarkMode, isDarkMode } from './darkMode.js';
import { scrollRight, scrollLeft } from './scrollF.js';
import {getfavs, setfavs, removeFav} from './favsSet.js'
getGifTrending();


/*
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
function removeFav (id) {
    let favs = getfavs();
    const index = favs.indexOf(id);
    if (index> -1) {
        favs.splice(index, 1);
    }
    localStorage.setItem('favIDs', JSON.stringify((favs)));
}
*/

/* renderizar gifs. primero tengo qeu obtener el gif apartir de ID */

async function getGifFavorite() { 
    try{
        let favs = getfavs();
        if (favs.length == 0) {
            let btn = document.getElementById('btn');
            btn.style.display = 'none';
            let icon = document.createElement('img');
            let iconContainer = document.createElement('div');
            let place = document.getElementById('favorites-container');
            let message = document.createElement('p');
            icon.src='./recursos/icon-fav-sin-contenido.svg';
            iconContainer.setAttribute('class', 'noGif');
            message.innerText='¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!';
            iconContainer.appendChild(icon);
            iconContainer.appendChild(message);
            place.appendChild(iconContainer);
            let off = document.getElementById('favorites_display')
            off.style.display= 'none';
            
        }else{
            if (favs.length <= 12) {
                let more  = document.getElementById('btn');
                more.style.display = 'none';
            }
            const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
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
            
        }
    } catch (err) {
    console.log('Error');    
    }
}

getGifFavorite();


let newGifbtn = document.getElementById('createGifbtn');
newGifbtn.addEventListener('mouseover', () => {
    newGifbtn.src = './recursos/CTA-crear-gifo-hover.svg'
});
newGifbtn.addEventListener('mouseout', () =>{
    if (isDarkMode()) {
        newGifbtn.src ='./recursos/CTA-crar-gifo-modo-noc.svg'
    }else{

        newGifbtn.src = './recursos/CTA-crear-gifo-active.svg';
    }
});

let sliderBtnR = document.getElementById('next');
sliderBtnR.addEventListener('click', () => {
    scrollRight();
})

let sliderBtnL = document.getElementById('back');
sliderBtnL.addEventListener('click', () => {
    scrollLeft();
})
let twitter = document.getElementById('twitter');
twitter.addEventListener('mouseover', () => {
    twitter.src = './recursos/icon-twitter-hover.svg'
});
twitter.addEventListener('mouseout', () =>{
    twitter.src = './recursos/icon-twitter.svg';
});

let facebook = document.getElementById('facebook');
facebook.addEventListener('mouseover', () => {
    facebook.src = './recursos/icon_facebook_hover.svg'
});
facebook.addEventListener('mouseout', () =>{
    facebook.src = './recursos/icon_facebook.svg';
});

let instagram = document.getElementById('instagram');
instagram.addEventListener('mouseover', () => {
    instagram.src = './recursos/icon_instagram-hover.svg'
});
instagram.addEventListener('mouseout', () =>{
    instagram.src = './recursos/icon_instagram.svg';
});


startDarkMode(isDarkMode());
let button = document.getElementById("dark-mode-btn");
button.addEventListener("click", () => {
    toggleDarkMode();
});

let buttonNext = document.getElementById('btn-next-img');
let buttonPrev = document.getElementById('btn-prev-img');
let logo = document.getElementById('GifosLogo');
let plusGif = document.getElementById('createGifbtn');
if (isDarkMode()) {
    button.innerText='Modo Diurno';
    buttonPrev.src='./recursos/button-slider-left-md-noct.svg';
    buttonNext.src='./recursos/button-slider-right-md-noct.svg';
    logo.src ='./recursos/Logo-modo-noc.svg';
    plusGif.src ='./recursos/CTA-crar-gifo-modo-noc.svg'
}
buttonPrev.addEventListener('mouseover', () =>{
    buttonPrev.src='./recursos/button-slider-left-hover.svg';
});
buttonPrev.addEventListener('mouseout', () =>{
    if (isDarkMode()) {
        buttonPrev.src='./recursos/button-slider-left-md-noct.svg';
    } else{
        buttonPrev.src='./recursos/button-slider-left.svg';
    }
});
buttonNext.addEventListener('mouseover', () =>{
    buttonNext.src='./recursos/button-slider-right-hover.svg';
});
buttonNext.addEventListener('mouseout', () =>{
    if (isDarkMode()) {
        buttonNext.src='./recursos/button-slider-right-md-noct.svg';
    } else{
        buttonNext.src='./recursos/button-slider-right.svg';
    }
});


export {setfavs, getfavs, removeFav}