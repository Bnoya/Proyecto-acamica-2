function scrollRight(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += 1160;
}

function scrollLeft(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += -1160;
}

export{scrollRight, scrollLeft}