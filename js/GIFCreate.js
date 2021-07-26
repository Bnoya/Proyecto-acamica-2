import { startDarkMode, toggleDarkMode, isDarkMode } from './darkMode.js';

var button = document.getElementById("dark-mode-btn");
button.addEventListener("click", () => {
    toggleDarkMode();
});

startDarkMode(isDarkMode());

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
let info = document.getElementById('text');

let step1 = document.getElementById('step1');
let step2 = document.getElementById('step2');
let step3 = document.getElementById('step3');

let clockCont= document.getElementById('clockCont');
let reDo = document.createElement('button');
reDo.innerText = 'REPETIR CAPTURA'
reDo.setAttribute('class', 'reDo');



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
        let clock = document.getElementById('stop');
        clock.remove();
        clockCont.appendChild(reDo)
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
        clockCont.appendChild(reDo);
        reDo.addEventListener('click', async () =>{
            step2.style.color= '#572EE5';
            step2.style.background = '#FFFFFF';
            upload.remove();
            playGIF.remove();
            reDo.remove();
            start.appendChild(btnStart);
            let stream = null;
            step1.style.color = '#FFFFFF';
            step1.style.background = '#572EE5';
            try{
                stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true});
                textCont.remove();
                containerVideo.appendChild(video);
                record(stream);
            } catch (err) {
                console.log(err);
            }
        })
        upload.addEventListener('click', async() =>{
            start.remove();
            upload.remove();
            reDo.remove();

            step3.style.color = '#FFFFFF';
            step3.style.background = '#572EE5';
            step2.style.color = '#572EE5';
            step2.style.background = '#FFF';
            let purpleHover = document.createElement('div');
            let loadingIcon = document.createElement('img');
            let status = document.createElement('p');
            let download = document.createElement('img');
            let link = document.createElement('img');
            let buttons = document.createElement('div');
            let message = document.createElement('div');

            status.innerText= 'Estamos Subiendo tu GIFO';
            loadingIcon.src = './recursos/loader.svg';

            purpleHover.setAttribute('class', 'purpleHover');
            loadingIcon.setAttribute('class', 'loading spinning');
            status.setAttribute('class', 'loadingMess');

            download.setAttribute('class', 'download');
            link.setAttribute('class', 'link');
            buttons.setAttribute('class', 'buttons');
            message.setAttribute('class', 'message');

            containerVideo.appendChild(purpleHover);
            purpleHover.appendChild(buttons);
            purpleHover.appendChild(message);
            buttons.appendChild(download);
            buttons.appendChild(link);
            message.appendChild(loadingIcon);
            message.appendChild(status);


            let uploaded = await uploadGif(blob);
            if (uploaded) {
                loadingIcon.classList.remove('spinning');
                loadingIcon.src= './recursos/ok.svg'
                status.innerText = 'GIFO subido con éxito'
                download.src = './recursos/icon-download.svg';
                link.src = './recursos/icon-link-normal.svg';
                message.style.marginTop = '-32px';
                download.addEventListener('mouseover', () => {
                    download.src = './recursos/icon-download-hover.svg'
                });
                link.addEventListener('mouseover', () => {
                    link.src = './recursos/icon-link-hover.svg'
                });
                
            }else{
                status.innerText = 'No podimos subir su GIFO. Intentelo mas tarde!'
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
        let timer = setInterval(showTime, 1000);
        let text= document.createElement('p')
        text.setAttribute('id', 'stop');
        text.setAttribute('class', 'timer');
        let hr = 0; 
        hr = hr < 10 ? '0' + hr : hr;

        let min =0;
        min = min < 10 ? '0' + min : min;
        let sec =0;
        function showTime() {
            if (sec > 60) {
                min++;
                min = min < 10 ? '0' + min : min;
                sec=0;
                sec = sec < 10 ? '0' + sec : sec;
            } else{
                sec++
                sec = sec < 10 ? '0' + sec : sec;
            }

            let time = hr + ':' + min + ':' + sec;
            text.innerText = time
            clockCont.appendChild(text);

            btnStop.addEventListener('click', () =>{
                clearInterval(timer);
            })
        }

    });
    step1.style.color = '#572EE5';
    step1.style.background = '#FFF';
    step2.style.color = '#FFF';
    step2.style.background = '#572EE5';
    
}

let begin = async () =>{
    let text = document.getElementById('Tmessage').innerText = '¿Nos das acceso a tu cámara?';
    let parr = document.getElementById('Pmessage1').innerText = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
    let textCont = document.getElementById('text');
    btnbegin.remove();
    start.appendChild(btnStart);
    let stream = null;
    step1.style.color = '#FFFFFF';
    step1.style.background = '#572EE5';
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


const saveMyGif = (data) => {
    let myGifs = getMyGifs();
    myGifs.push(data)
    localStorage.setItem('myGifs', JSON.stringify(myGifs));
}

const getMyGifs = () => {
    try {
        let myGifs = JSON.parse(localStorage.getItem('myGifs'));
        if (myGifs !== undefined && myGifs !== null){
            return myGifs;
        } else{
            return []
        }
    } catch (err) {
        console.log(err)
        return [];
    }
}

let newGifbtn = document.getElementById('createGifbtn');
newGifbtn.addEventListener('mouseover', () => {
    newGifbtn.src = './recursos/CTA-crear-gifo-hover.svg'
});
newGifbtn.addEventListener('mouseout', () =>{
    newGifbtn.src = './recursos/CTA-crear-gifo-active.svg';
});
