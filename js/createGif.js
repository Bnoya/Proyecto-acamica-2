import { startDarkMode } from './darkMode.js';

var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);

/*Solicitar permiso de acceso a camara*/
let video = document.getElementById('video');
let start = document.getElementById('startBtn');
start.addEventListener('click', ()=> {
    startGif();
});

function startGif() {
    let turnoff1 = document.getElementById('text');
    turnoff1.setAttribute('class', 'off');
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(record)
    .catch((err)=> console.log);
    
}

let chunks = [];

function record(stream){
    if ('srcObject' in video) {
        video.srcObject = stream;
    } else{
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
    video.onloadeddata = () =>{
        video.play();
    };
    
    video.srcObject = stream;

    let mediaRecorder = new MediaRecorder(stream, {
        MimeType: 'video/webm;codecs=h264'
    });

    mediaRecorder.start();

    mediaRecorder.ondataavailable = function(e){
        console.log(e.data);
        chunks.push(e.data);
    }

    mediaRecorder.onstop = function(){
        alert('finalizo grabación');

        let blob = new Blob(chunks, {type:'video/webm'});

        chunks = [];
        videoOff();
        play(blob);
    }

    setTimeout(()=> mediaRecorder.stop(),5000);

}


function download(blob){
    let link = document.createElement('a');
    let img = document.createElement('img');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'video_recorded.webm');
    
    img.src= './recursos/icon-download.svg'
    link.appendChild(img);
    document.body.appendChild(link);

    link.click();
    link.remove();
}

function play(blob) {
    console.log('entre a play');
    video.src = window.URL.createObjectURL(blob);
}



/*Upload to giphy  */

const saveMyGif = (data) => {
    let myGifs = getMyGifs();
    myGifs.push(data)
    localStorage.setItem('myGifs', JSON.stringify(myGifs));
}
const uploadGif = async (blob) =>  {
    const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
    let form = new FormData();
    console.log(blob)
    form.append('file', blob, 'myGif.gif');
    let response = await fetch(uploadUrl, {
        body: form,
        method: "post"
    })
    let data = await response.json();
    if (response.status == 200) {
        saveMyGif(data.data.id)
        return true
    } else {
        console.log('Hubo un error: '+ response.status)
        return false
    }
}