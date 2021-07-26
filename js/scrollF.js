function scrollRight(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += 300;
}

function scrollLeft(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += -300;
}

export{scrollRight, scrollLeft}