function scrollRight(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += 1160;
}

function scrollLeft(){
    let gifs = document.getElementById('gif')
    gifs.scrollLeft += -1160;
}


function greyLine(loc){

    let titCont = document.createElement('div')
    let greyLines = document.createElement('div');
    greyLines.setAttribute('class', 'greyLine');
    greyLines.setAttribute('id', 'del');
    titCont.setAttribute('id', 'del');
    titCont.appendChild(greyLines);
    loc.appendChild(titCont);
}
export{scrollRight, scrollLeft, greyLine}