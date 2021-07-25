import {getfavs , removeFav, setfavs} from './favoritos.js';
import{bigCard} from './bigCard.js';
const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
    function createCard(info, index, gif){
    const div = document.createElement('div');
    const img = document.createElement('img');
    const hover = document.createElement('div');
    const btn_container = document.createElement('div');
    const txt_container = document.createElement('div')
    const fav = document.createElement('img');
    const expand = document.createElement('img');
    const a = document.createElement('a');
    const download = document.createElement('img');
    const title = document.createElement('h6');
    const user = document.createElement('p');
        const favs = getfavs();
        const exist = favs.indexOf(info.data[index].id);

        if (exist > "-1") {
            fav.src='./recursos/icon-fav-active.svg';
        }else {
            fav.src='./recursos/icon-fav.svg';
        }
    /*fav.src='./recursos/icon-fav.svg';*/
    expand.src='./recursos/icon-max-normal.svg';
    download.src='./recursos/icon-download.svg';
    title.innerText = info.data[index].title;
    user.innerText = info.data[index].username;
    img.src=info.data[index].images.original.url;
    
    img.setAttribute("class", "gifs-img");
    div.setAttribute("class", "gifs-div");
    div.setAttribute('id', 'del');
    hover.setAttribute('class', 'gif-hover');
    btn_container.setAttribute('class', 'btn');
    txt_container.setAttribute('class', 'txt');
    img.setAttribute("id", info.data[index].id);
    btn_container.appendChild(fav);
    fav.addEventListener('click', () =>{
        console.log ('funciona el evento');
        let favsarr = getfavs();
        if (favsarr.indexOf((img.id))> -1) {
            removeFav(img.id);
            fav.src='./recursos/icon-fav.svg';
        }else {
            setfavs(img.id);
            fav.src='./recursos/icon-fav-active.svg';
        }
        });
    expand.setAttribute('id', 'bigCard');
    expand.addEventListener('click', () =>{
        bigCard(info, index, gif);
    });
    img.addEventListener('click', () =>{
        bigCard(info, index, gif);
    });
    download.addEventListener('click', async ()=> {
        let response = await fetch(`https://media2.giphy.com/media/${info.data[index].id}/giphy.gif?${apiKey}&rid=giphy.gif`);
        let file = await response.blob();
        a.download = info.data[index].id;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    });

    gif.appendChild(div);
    div.appendChild(img);
    div.appendChild(hover);
    hover.appendChild(btn_container);
    hover.appendChild(txt_container);
    txt_container.appendChild(user);
    txt_container.appendChild(title);
    a.appendChild(download);
    btn_container.appendChild(a);
    btn_container.appendChild(expand);
    }

export {createCard}


