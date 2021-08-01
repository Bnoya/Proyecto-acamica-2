const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';

async function downloadMyGif(gifId, downloadA){
    let response = await fetch (`https://media2.giphy.com/media/${gifId}/giphy.gif?${apiKey}&rid=giphy.gif`);
    let file = await response.blob();
    downloadA.href = window.URL.createObjectURL(file);
    downloadA.download ='';
    downloadA.dataset.downloadurl = ['application/octet-stream', downloadA.download, downloadA.href].join(':');
    downloadA.click();
}

async function gifLink(gifId) {
    let response = await fetch (`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${gifId}`);
    let Gif = await response.json();
    console.log(Gif);
    let copy = document.createElement('textarea');
    copy.value =`${Gif.data[0].url}`;
    document.body.appendChild(copy);
    copy.focus();
    copy.select();
    document.execCommand('copy');
    console.log(Gif.data[0].url);
    copy.style.display='none';
    copy.parentNode.removeChild(copy);

    alert("Copied the text: " + copy.value);
}


export {downloadMyGif, gifLink}