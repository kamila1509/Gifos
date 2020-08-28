const viewNewGif = `
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
            <li class="step">1</li>
            <li class="step">2</li>
            <li class="step">3</li>
            <li class="onDesktop capture-time">Repetir Captura</li>
        </ul>
        
    </div>
    <div class="new-gif-line-divider"></div>
    <div class="new-gif-record-container">
        <div class="button">Grabar</div>
    </div>
    </div>
`;

function createComponent(container) {
    container.innerHTML = viewNewGif;
}

export default {
    createComponent
}