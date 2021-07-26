function getfavs (){
    let fav = localStorage.getItem('favIDs');
    let favs= JSON.parse(fav);
    if (favs ===null) {
        localStorage.setItem('favIDs', JSON.stringify([]));
        fav = localStorage.getItem('favIDs');
        favs= JSON.parse(fav);
    }
    return (favs);
} 
function setfavs (id){
    let favs = getfavs();
    if (favs== null) {
        favs = [];
    }
    favs.push(id);
    localStorage.setItem('favIDs', JSON.stringify((favs)));
}
function removeFav (id) {
    let favs = getfavs();
    const index = favs.indexOf(id);
    if (index> -1) {
        favs.splice(index, 1);
    }
    localStorage.setItem('favIDs', JSON.stringify((favs)));
}


export {getfavs, setfavs, removeFav};