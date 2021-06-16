
/*Function for turning dark mode on*/ 
var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);
function startDarkMode() {
    var element = document.getElementById("dark-mode");
    element.classList.toggle("dark-mode");
}

/*Function for geting gifs from giphy*/ 

const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
const gif = document.getElementById('gif')

async function getGifTrending(){
    let url=`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    try {
        const response= await fetch(url);
        const info = await response.json();
        console.log(info.data[0]);
        for (let index = 0; index < 11; index++) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src=info.data[index].images.original.url;
            img.setAttribute("class", "gifs-img");
            div.setAttribute("class", "gifs-div");
            img.setAttribute("id", info.data[index].id);
            gif.appendChild(div)
            div.appendChild(img);
        }
    } catch (error) {
        console.log(error);
    }
}

getGifTrending(); 


/*Search funtion*/

const btn= document.getElementById('btn_search');
btn.addEventListener('click', searchBar, true);
let search = document.getElementById('Search-gifs');
async function searchBar(){
    let word = document.getElementById('search_input').value;
    console.log(word);
    console.log('activo la funcion')
    for (let i=0; i<12; i++){
        let del = document.getElementById('del');
        if (del !== null){
            del.remove();
        }
    }
    let url=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${word}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        for (let i = 0; i < 12; i++){
            let div = document.createElement('div');
            let img = document.createElement('img');
            img.src=data.data[i].images.original.url;
            div.setAttribute("class", "gifs-div");
            img.setAttribute("class", "gifs-img");
            div.setAttribute('id', 'del')
            img.setAttribute("id", data.data[index].id);
            search.appendChild(div);
            div.appendChild(img);
        }
    } catch (error){
        console.log(error);
    }
}
/*Search suggestion*/ 
let bar =document.getElementById("search-bar");
let input = document.getElementById('search_input');
let sugges = document.getElementById('suggestions')
input.addEventListener('keyup', suggestionBar, true);
async function suggestionBar(){
    console.log(input.value);
    if(input.value == ''){
        sugges.classList.remove('suggestions');
    }else{
        sugges.setAttribute('class', 'suggestions');
    }
    for (let i=0; i<4; i++){
        let del = document.getElementById('del');
        if (del !== null){
            del.remove();
        }
    }
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${input.value}&limit=5`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        for (let i=0 ; i < 4; i++){
            let div = document.createElement('div');
            let text = document.createElement('button');
            text.innerText = data.data[i].name;
            div.setAttribute("class", "sug-div");
            div.setAttribute('id', 'del');
            text.setAttribute('class','button-sug');
            text.setAttribute('id',`sug-${i}`);
            sugges.appendChild(div);
            div.appendChild(text);
        }
        
    } catch (error) {
        console.log(error);
    }
}