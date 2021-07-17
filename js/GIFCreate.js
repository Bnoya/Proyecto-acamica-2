import {startDarkMode} from './darkMode.js';

const apiKey = 'O1ETr1fxsaxXqPfEced8hyndbec7c3C9';
var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", startDarkMode, true);


let video = document.createElement('video');
video.classList.add('video');
video.id = 'video';


let start = document.getElementById('startBtn');

let btnbegin = document.createElement('button');
btnbegin.innerText = 'COMENZAR';
start.appendChild(btnbegin);

let btnStart = document.createElement('button');
btnStart.innerText = 'GRABAR';


let btnStop = document.createElement('button');
btnStop.innerText = 'FINALIZAR';

let upload = document.createElement('button');
upload.innerText = 'SUBIR GIFO';

let containerVideo = document.getElementById('frame2');


/* create GIF */

let StartnStop = async (stream) => {
    btnStart.remove();
    let recorder = new RecordRTCPromisesHandler (stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifPreview: function(gifURL) {
            let videoEl = document.getElementById('video');
            videoEl.src = gifURL;
        }
    });
    recorder.startRecording();


    btnStop.addEventListener('click', async () => {
        await recorder.stopRecording();

        let blob = await recorder.getBlob();

        recorder = null;

        let video1 = document.getElementById('video');
        video1.srcObject = null;
        video1.remove();

        let playGIF = document.createElement('img');
        playGIF.classList.add('video');
        playGIF.src = URL.createObjectURL(blob);
        containerVideo.appendChild(playGIF);
        btnStop.remove();

        upload.addEventListener('click', async() =>{
            upload.remove();
            let uploaded = await uploadGif(blob);
            if (uploaded) {
                /*create hovers */
            }
        });
        stream.getTracks()[0].stop();
        start.appendChild(upload);
    });
    start.appendChild(btnStop);
}

let record = (stream) =>{
    let video1 = document.getElementById('video');
    if ('srcObject' in video) {
        video1.srcObject = stream;
    } else{
        video1.src = window.URL.createObjectURL(MediaStreamObj);
    }
    video1.onloadedmetadata = () => {
        video.play();
    };
    btnStart.addEventListener('click', () => {
        StartnStop(stream);
    });
    start.appendChild(btnStart);
}

let begin = async () =>{
    let text = document.getElementById('Tmessage').innerText = '¿Nos das acceso a tu cámara?';
    let parr = document.getElementById('Pmessage1').innerText = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
    let textCont = document.getElementById('text');
    btnbegin.remove();
    let stream = null;
    try{
        stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true});
        textCont.remove();
        containerVideo.appendChild(video);
        record(stream);
    } catch (err) {
        console.log(err);
    }
}

btnbegin.addEventListener('click', async () =>{
    begin();
})


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


