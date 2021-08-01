import { createCard } from './small_card.js';
import { getGifTrending} from './trendingGifs.js';
import { startDarkMode, toggleDarkMode, isDarkMode } from './darkMode.js';
import { scrollRight, scrollLeft } from './scrollF.js'
/**Dark mode On */
const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
let blue_btn = document.getElementById('btn_search');
let buttonNext = document.getElementById('btn-next-img');
let buttonPrev = document.getElementById('btn-prev-img');
var button = document.getElementById("dark-mode-btn");
let logo = document.getElementById('GifosLogo');
let plusGif = document.getElementById('createGifbtn');
button.addEventListener("click", () => {
    toggleDarkMode();
});

startDarkMode(isDarkMode());


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
if (isDarkMode()) {
    blue_btn.src = './recursos/icon-search-modo-noct.svg';
    button.innerText='Modo Diurno';
    buttonPrev.src='./recursos/button-slider-left-md-noct.svg';
    buttonNext.src='./recursos/button-slider-right-md-noct.svg';
    logo.src ='./recursos/Logo-modo-noc.svg';
    plusGif.src ='./recursos/CTA-crar-gifo-modo-noc.svg'
}
/* Gif Trainding */

getGifTrending();
/* Search Function */  



const btn= document.getElementById('btn_search');
let inputs = document.getElementById('search_input');
let search = document.getElementById('Search-gifs');

btn.addEventListener('click', ()=> {
    searchBar(inputs.value, search);
});

inputs.addEventListener('keydown', (e) => {
    if (e.key ==='Enter') {
        searchBar(inputs.value, search);
    } else{
        suggestionBar();
    }
})


async function searchBar(word, search){
    
    getGifTrending();

    blue_btn.classList.remove('hide');
    if (isDarkMode()) {
        blue_btn.src = './recursos/close-modo-noct.svg';
    } else{

        blue_btn.src = './recursos/close.svg';
    }
    blue_btn.addEventListener('click', e => location.reload());

    let off = document.getElementById('center-text');
    let leave1 = document.getElementById('leave1');
    let leave2 = document.getElementById('leave2');

    if (leave1 !== null && leave2 !== null) {
        leave1.remove();
        leave2.remove();
    }
    let place =document.getElementById('title-search');
    let line = document.createElement('div');
    let title = document.createElement('h4');
    
    title.innerHTML = word;
    title.setAttribute('class', 'h4');
    line.setAttribute('class', 'greyline');
    title.setAttribute('id', 'leave1');
    line.setAttribute('id', 'leave2');
    place.appendChild(line);
    place.appendChild(title);

    for (let i=0; i<65; i++){
        let del = document.getElementById('del');
        if (del !== null){
            del.remove();
        }
    }
    for (let i=0; i<65; i++){
        let dels = document.getElementById('dels');
        if (dels !== null){
            dels.remove();
        }
    }
    let url=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${word}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        off.style.display = 'none';
        if (data.data.length !== 0) {
            for (let i = 0; i < 12; i++){
                createCard(data, i, search);
            }
            let home = document.getElementById('moreGifs')
            let button = document.createElement('button');
            button.src = './recursos/CTA-ver-mas.svg';
            if (isDarkMode()) {
                button.src = './recursos/CTA-ver-mas.svg'
            }
            button.innerText = 'VER MAS';
            button.setAttribute('class', 'watchMore');
            button.setAttribute('id', 'del')
            home.appendChild(button);
    
            button.addEventListener('click', () =>{
                button.style.display = 'none';
                for (let i = 12; i < 50 ; i++){
                    createCard(data, i, search);
                }
            })
            
        } else{
            let noGif = document.createElement('div');
            let noResImg = document.createElement('img');
            let noResP = document.createElement('p');
            noResP.innerText = "Intenta con otra búsqueda.";
            noResImg.src = './recursos/icon-busqueda-sin-resultado.svg';
            noGif.classList.add('wrong')
            noGif.appendChild(noResImg);
            noGif.appendChild(noResP);
            search.appendChild(noGif);
        }
    } catch (error){
        console.log(error);
    }

    let more = document.createElement('button');
    
}


/*Search suggestion*/ 
let bar =document.getElementById("search-bar");
let input = document.getElementById('search_input');
let sugges = document.getElementById('results-ul')
input.addEventListener('input', suggestionBar);
async function suggestionBar(){
    for (let i=0 ; i<15 ; i++){
        let del = document.getElementById('dels');
        if (del !== null){
            del.remove();
        }
    }
    let blue_btn = document.getElementById('btn_search');
    let img = document.getElementById('search-gray');

    if (isDarkMode()) {
        blue_btn.src = './recursos/close-modo-noct.svg';
    } else{

        blue_btn.src = './recursos/close.svg';
    }
    blue_btn.addEventListener('click', e => location.reload());


    img.classList.remove('hide');
    img.style.opacity = 1;
    if(input.value == ''){
        sugges.classList.remove('suggestions');
    }else{
        sugges.setAttribute('class', 'suggestions sugg-results');
    }
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${input.value}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        
        for (let i=0 ; i < 4; i++){
            let li = document.createElement('li');
            let text = document.createElement('p');
            let search = document.createElement('img');
            text.innerText = data.data[i].name;
            search.src = './recursos/icon-search-mod-gray.svg';
            li.setAttribute("class", "sug-li");
            li.setAttribute('id', 'dels');
            text.setAttribute('class','button-sug');
            text.setAttribute('id',`sug-${i}`);


            let place = document.getElementById('Search-gifs');
            li.addEventListener('click', () => {
                searchBar(data.data[i].name, place);
            });

            li.appendChild(search);
            li.appendChild(text);
            sugges.appendChild(li);
        }
        
    } catch (error) {
        console.log(error);
    }
}

/* Terminado el suggestion*/


/* trending words */
async function  getWords() {
    const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    let op = document.getElementById('center-text');
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        let opArr = data.data.slice(0,6);
        let cont = document.getElementById('tranw');
        for (let index = 1; index < opArr.length ; index++) {
            let word = opArr[index];
            let span = document.createElement('span');
            let p = document.createElement('p');
            span.id = word;
            if (index === 5) {
                p.innerText = word;
            }else{
                p.innerText = `${word}, ` ;
            }
            span.appendChild(p);
            cont.appendChild(span);

            span.addEventListener('click', ()=>{
                searchBar(span.id, search);
            })
        }
    } catch (error){
        console.log(error);
    }
}
getWords();

/* select words */


let sliderBtnR = document.getElementById('next');
sliderBtnR.addEventListener('click', () => {
    scrollRight();
})

let sliderBtnL = document.getElementById('back');
sliderBtnL.addEventListener('click', () => {
    scrollLeft();
})


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

export{ apiKey};