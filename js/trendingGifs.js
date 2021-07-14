import { createCard } from './small_card.js';

async function getGifTrending(){
    const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
    const gif = document.getElementById('gif')
    let carrusel = [];
    let url=`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=13`;

    try {
        const response= await fetch(url);
        const info = await response.json();
        console.log('entre a api');
        console.log(info)
        for (let index = 0; index < 11; index++) {
            carrusel.push(info.data[index].images.original.url);
            createCard(info, index, gif);
        }
    } catch (error) {
        console.log(error);
    }
}



export{getGifTrending}