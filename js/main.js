
import { createCard } from './small_card.js';
import { getGifTrending} from './trendingGifs.js';
import { startDarkMode } from './darkMode.js';
import { scrollRight, scrollLeft } from './scrollF.js'
/**Dark mode On */
const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';

var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);



/* Gif Trainding */

/*getGifTrending();*/
/* Search Function */  



const btn= document.getElementById('btn_search');
let inputs = document.getElementById('search_input');
let search = document.getElementById('Search-gifs');

btn.addEventListener('click', ()=> {
    searchBar(inputs.value, search);
});



async function searchBar(word, search){
    
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


    for (let i=0; i<15; i++){
        let del = document.getElementById('del');
        if (del !== null){
            del.remove();
        }
    }
    for (let i=0; i<15; i++){
        let del = document.getElementById('dels');
        if (del !== null){
            del.remove();
        }
    }
    let url=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${word}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        off.style.display = 'none';
        for (let i = 0; i < 12; i++){
            createCard(data, i, search);
        }
    } catch (error){
        console.log(error);
    }
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
    /*blue_btn.classList.add('hide');*/
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
        let opArr = data.data.slice(0,5);
        let opTr = opArr[0];
        for (let index = 1; index < opArr.length ; index++) {
            let word = opArr[index];
            opTr = opTr + ', '+ word;
        }
        let cont = document.getElementById('tranw');
        cont.innerText = opTr;


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

export{startDarkMode, apiKey};