const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';

async function downloadMyGif(gifId, downloadA){
    let response = await fetch (`https://media2.giphy.com/media/${gifId}/giphy.gif?${apiKey}&rid=giphy.gif`);
    let file = await response.blob();
    downloadA.href = window.URL.createObjectURL(file);
    downloadA.download ='';
    downloadA.dataset.downloadurl = ['application/octet-stream', downloadA.download, downloadA.href].join(':');
    downloadA.click();
}

export {downloadMyGif}