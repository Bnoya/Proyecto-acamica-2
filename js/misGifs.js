import { getGifTrending } from './trendingGifs.js';
import { createCard } from './small_card.js';
import { startDarkMode, toggleDarkMode, isDarkMode } from './darkMode.js';


var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", () => {
    toggleDarkMode();
});

startDarkMode(isDarkMode());

getGifTrending();





function getMyGifs (){
    let myGif = localStorage.getItem('myGifs');
    let myGifs= JSON.parse(myGif);
    if (myGifs ===null) {
        localStorage.setItem('myGifs', JSON.stringify([]));
        myGif = localStorage.getItem('myGifs');
        myGifs= JSON.parse(myGif);
    }
    return (myGifs);
} 

async function getSelfGifs() { 
    try{
    let myGifs = getMyGifs();
    
    if (myGifs.length == 0) {
        let btn = document.getElementById('btn');
        btn.style.display = 'none';
        let icon = document.createElement('img');
        let iconContainer = document.createElement('div');
        let place = document.getElementById('myGifs-container');
        let message = document.createElement('p');
        icon.src='./recursos/icon-mis-gifos-sin-contenido.svg';
        iconContainer.setAttribute('class', 'noGif');
        message.innerText='¡Animate a crear tu primer GIFO!';
        iconContainer.appendChild(icon);
        iconContainer.appendChild(message);
        place.appendChild(iconContainer);
    }else{
        
        let cont = document.getElementById('myGifs_display'); 
            const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
            let more = document.getElementById('btn');
            let url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${myGifs}`;
            const response = await fetch(url);
            const data = await response.json();
            for (let index = 0; index < 12; index++) {
                    createCard(data ,index, cont);
                }
            more.addEventListener('click', (index) => {
                for (let index = 12; index < myGifs.length; index++) {
                    createCard(data ,index, cont);
                }
                more.style.display = 'none';
            })

        }
    
    } catch (err) {
    console.log('Error');    
    }
}
getSelfGifs();

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