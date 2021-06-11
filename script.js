var botton = document.getElementById("dark-mode-btn");
botton.addEventListener("click", startDarkMode, true);
function startDarkMode() {
    var element = document.getElementById("dark-mode");
    element.classList.toggle("dark-mode");
}


const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
const gif = document.getElementById('gif')

async function getGifTrending(){
    let url=`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    try {
        const response= await fetch(url);
        const info = await response.json();
        console.log(info.data[0]);
        for (let index = 0; index < 11; index++) {
            const img = document.createElement('img');
            img.src=info.data[index].images.original.url;
            img.setAttribute("class", "gifs");
            img.setAttribute("id", info.data[index].id);
            gif.appendChild(img);
        }
    } catch (error) {
        console.log(error);
    }
}

getGifTrending(); 


