import Data from '../utils/postData.js'
const viewNewGif = `
<div class="flex">
<div class="flex-1 onDesktop film-camara">
   
    <div class="film-camara-container">
        <div class="film-camara-record">
            <img class="record1" src="./assets/element_cinta1.svg" alt="">
            <img class="record2" src="./assets/element_cinta2.svg" alt="">
        </div>
        <div class="film-camara-body">
            <img class="film-camara-main" src="./assets/element-camara.svg" alt="">
            <img class="film-camara-light" src="./assets/element-luz-camara.svg" alt="">
        </div>
    </div>

</div>
<div class="flex-2">
    <div class="new-gif-create-container">
        <div class="flex new-gifs-square">
            <div class="square top-border left-border"></div>
            <div class="square top-border right-border"></div>
        </div>
        <div class="flex new-gifs-square">
            <div class="square botom-border left-border"></div>
            <div class="square botom-border right-border"></div>
        </div>
        <div id="video-container" class="new-gifos-welcome-message">
            <h1 class="main-title">Aquí podrás <br> crear tus propios <span>GIFOS</span></h1>
            <p class="new-gifos-welcome-paragraph">¡Crea tu GIFO en sólo 3 pasos!<br>(sólo necesitas una cámara para grabar un video)</p>
        </div>
    </div>
    <div class="new-gif-create-controllers">
        <div class="new-gif-create-steps"">
            <ul class="new-create-steps">
                <li id="step1" class="step">1</li>
                <li id="step2" class="step">2</li>
                <li id="step3"class="step">3</li>
                <li id="time-capture" class="onDesktop capture-time">Repetir Captura</li>
                <li id="timer" class="onDesktop capture-time timer"></li>
            </ul>
            
        </div>
        <div class="new-gif-line-divider"></div>
        <div class="new-gif-record-container">
            <div id="start" class="button">Comenzar</div>
            <div id="record" class="button no-display">Grabar</div>
            <div id="finish" class="button no-display">Finalizar</div>
            <div id="upload" class="button no-display">Subir Gifo</div>
        </div>
    </div>
</div>
<div class="flex-1 movie onDesktop">
    <img src="./assets/pelicula.svg" alt="">
</div>

</div>
`;

const giveAccesToCamara = `
    <h1 id="video-title" class="main-title">¿Nos das acceso <br> a tu cámara?</h1>
    <p id="video-text" class="new-gifos-welcome-paragraph">El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>
`;

function getStream () { 
    firstStep();
    let video = document.createElement('video');
    let videoContainer= document.getElementById('video-container');
    videoContainer.innerHTML = giveAccesToCamara;
    videoContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 300 }
    }
 })
 .then(async function(stream) {
    video.srcObject = stream;
    video.play();
    secondStep();
    const recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
         console.log('started')
       },
      })
        let record = document.getElementById('record');
        record.addEventListener('click',function(){
            video.play();
            recorder.startRecording();
            thridStep();
            timer(true)
        })
        let finish = document.getElementById('finish');
        let blob
        finish.addEventListener('click',function(){
            recorder.stopRecording(function() {
                blob = recorder.getBlob();
            });
            video.pause();
            fourStep();
            timer(false);
        })
        let upload = document.getElementById('upload');
        upload.addEventListener('click',async function(){
            //invokeSaveAsDialog(blob);
            fiveStep();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');
            console.log(form.get('file'))
            //await Data.postGif(form);
            uploadGif(form);
            
        })

    })
 }

async function uploadGif (file) {
    let postGif = await Data.postGif(file);
    addToLocalStorage('MyGifs',postGif.data.id)
}
function addToLocalStorage(name,value) {
    let existing =localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : [];
    existing.push(value);
    localStorage.setItem(name,JSON.stringify(existing)); 
}
function fiveStep() {
    document.getElementById('step2').classList.remove('step--active')
    document.getElementById('step3').classList.add('step--active')
    document.getElementById('time-capture').style.display = 'none';
}
function fourStep() {
    document.getElementById('finish').style.display = 'none';
    document.getElementById('upload').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('time-capture').style.display = 'block';
}
 function thridStep() {
    document.getElementById('record').style.display = 'none';
    document.getElementById('time-capture').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('finish').style.display = 'block';
 }
 function secondStep () {
    document.getElementById('video-title').remove();
    document.getElementById('video-text').remove();
    document.getElementById('step1').classList.remove('step--active')
    document.getElementById('step2').classList.add('step--active')
    document.getElementById('record').style.display = 'block';
 }
 function firstStep(){
    document.getElementById('start').style.display = 'none';
    document.getElementById('step1').classList.add('step--active')
 }

 function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ':' + min + ':' + sec;
}

function timer(recorder) {
    let dateStarted = new Date().getTime();
    let timer = document.getElementById('timer');
    (function looper() {
        if (!recorder) {
            return;
        }
        timer.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
}

function events() {
    let start = document.getElementById('start');
    start.addEventListener('click',getStream);
    let repeat = document.getElementById('time-capture');
    repeat.addEventListener('click',function(){
        document.getElementById('upload').style.display = 'none';
        document.getElementById('step3').classList.remove('step--active')
        getStream();
    })

}
function createComponent(container) {
    document.getElementById('trending-container').style.visibility = "hidden";
    container.innerHTML = viewNewGif;
    events()
    
}

export default {
    createComponent
}