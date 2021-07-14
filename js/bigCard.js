import {getfavs , removeFav, setfavs} from './favoritos.js';
const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
function bigCard(info, index, gif){
    let test = document.getElementById('gif')
    let bigCard = document.createElement('div');
    if (gif !== test) {
        console.log('entro al if')
        bigCard.setAttribute ('class', 'bigCard');
    }else{
        console.log('entro al else')
        bigCard.setAttribute ('class', 'bigCardt');
    }

    let content = document.createElement('div');
    content.setAttribute ('class', 'carrusel');

    let cardImg = document.createElement('img');
    cardImg.src = info.data[index].images.original.url;
    cardImg.setAttribute("id", info.data[index].id);
    cardImg.setAttribute('class', 'cardImg');

    let footercont = document.createElement('div');
    footercont.setAttribute('class', 'footercont');
    let cardFooter = document.createElement('div');
    cardFooter.setAttribute('class', 'cardFooter');

    let footerText = document.createElement('div');
    footerText.setAttribute('class', 'cardText');

    let footerbtn = document.createElement('div');
    footerbtn.setAttribute('class', 'footerbtn');

    let username = document.createElement('h4');
    username.innerText = info.data[index].username;
    footerText.appendChild(username);
    let titleX = document.createElement('h3');
    titleX.innerText= info.data[index].title;
    footerText.appendChild(titleX);

    const fav = document.createElement('img');
        const favs = getfavs();
        const exist = favs.indexOf(info.data[index].id);
        if (exist > "-1") {
            fav.src='./recursos/icon-fav-active.svg';
            fav.style.marginTop = '-35px';
        }else {
            fav.src='./recursos/icon-fav.svg';
        }

        
        const a = document.createElement('a');
        const download = document.createElement('img');
        download.src='./recursos/icon-download.svg';
        a.appendChild(download);
        download.addEventListener('click', async ()=> {
            let response = await fetch(`https://media2.giphy.com/media/${info.data[index].id}/giphy.gif?${apiKey}&rid=giphy.gif`);
            let file = await response.blob();
            a.download = info.data[index].id;
            a.href = window.URL.createObjectURL(file);
            a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
            a.click();
        });
        
    fav.addEventListener('click', () =>{
        console.log ('funciona el evento');
        let favsarr = getfavs();

        if (favsarr.indexOf((cardImg.id))> -1) {
            removeFav(cardImg.id);
            fav.src='./recursos/icon-fav.svg';
        }else {
            setfavs(cardImg.id);
            fav.src='./recursos/icon-fav-active.svg';
        }
    });
    let next = document.createElement('div');
    let imgNext = document.createElement('img');
    imgNext.src = './recursos/Button-Slider-right.svg'
    imgNext.setAttribute('id', 'next');
    next.appendChild(imgNext);

    let prev = document.createElement('div');
    let imgprev = document.createElement('img');
    imgprev.src = './recursos/Button-Slider-left.svg'
    imgprev.setAttribute('id', 'prev');
    prev.appendChild(imgprev);
    
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    let cross = document.createElement('img');
    cross.src = './recursos/close.svg'
    cross.classList.add('cross')
    cross.addEventListener('click', () => {
            bigCard.remove()
    } )
    footerbtn.appendChild(fav);
    footerbtn.appendChild(a);
    header.appendChild(cross);
    content.appendChild(prev);
    content.appendChild(cardImg);
    content.appendChild(next);
    cardFooter.appendChild(footerText);
    cardFooter.appendChild(footerbtn);
    footercont.appendChild(cardFooter);
    bigCard.appendChild(header);
    bigCard.appendChild(content);
    bigCard.appendChild(footercont);
    gif.appendChild(bigCard);
}   

export{bigCard}