function scrollRight(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += 386;
}

function scrollLeft(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += -386;
}

export{scrollRight, scrollLeft}