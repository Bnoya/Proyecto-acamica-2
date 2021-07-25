import { getGifTrending } from './trendingGifs.js';
import { startDarkMode } from './darkMode.js';
import { createCard } from './small_card.js';


var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);

/*getGifTrending();*/





function getMyGifs (){
    let myGif = localStorage.getItem('myGifs');
    let myGifs= JSON.parse(myGif);
    if (myGifs ===null) {
        localStorage.setItem('myGifs', JSON.stringify([]));
        myGif = localStorage.getItem('myGifs');
        myGifs= JSON.parse(myGif);
    }
    console.log(myGifs);
    return (myGifs);
} 

async function getSelfGifs() { 
    try{
        const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
        let myGifs = getMyGifs();
        let more = document.getElementById('btn');
        let cont = document.getElementById('myGifs_display'); 
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
    newGifbtn.src = './recursos/CTA-crear-gifo-active.svg';
});

let sliderBtnR = document.getElementById('next');
sliderBtnR.addEventListener('click', () => {
    scrollRight();
})

let sliderBtnL = document.getElementById('back');
sliderBtnL.addEventListener('click', () => {
    scrollLeft();
})