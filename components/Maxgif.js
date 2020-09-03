function init(gif){
    const cardView = `
    <div id="${gif.id}-maxgif" class="max-card-container">
            <div class="center-div">
                <div id="max-gif-button-close" class="icons icon-close"></div>
                <div class="gif-max-card">
                    <div class="gif-max-image-container">
                        <img loading="lazy" src="${gif.images.fixed_width.webp}" alt="${gif.title}">
                    </div>
                    <div class="gif-max-information">
                        <div class="gif-max-text">
                            <div class="text-cart-user">${gif.username !== '' ? gif.username : 'User' }</div>
                            <h3 class="text-card-title">${gif.title}</h3>
                        </div>
                        <div class="gif-max-icons">
                            <div id="${gif.id}-remove-maxgif" class="icons icon-delete"></div>
                            <div id="${gif.id}-add-max-gif" class="icons icon-heart"></div>
                            <div id="${gif.id}-download-max-gif" class="icons icon-download"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return cardView
}

function addToLocalStorage(name,value) {
    let existing =localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : [];
    existing.push(value);
    localStorage.setItem(name,JSON.stringify(existing)); 
}
function addtoFavorites(gif) {
    document.getElementById(`${gif.id}-add-max-gif`).classList.add('icon-heart--active')
    addToLocalStorage('Favorites',gif)
}
function removeFavorites(gif) {
    let data = JSON.parse(localStorage.getItem('Favorites'))
    data.forEach((ítem,index) => ítem.id === gif.id ? data.splice(index,1): null)
    localStorage.setItem('Favorites',JSON.stringify(data))
    document.getElementById(gif.id).remove()
}
async function donwloadFavorites(gif){
    let a = document.createElement('a');
    let response = await fetch(`${gif.images.fixed_height_small.mp4}`);
    let file = await response.blob();
    a.download = `${gif.title}`;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}
function closeMaxGif(gif) {
    document.getElementById(`${gif.id}-maxgif`).remove()
    document.body.style.overflow = 'auto'
}
function events(gif){
    const toggleEvent = e => {
        if (e.currentTarget.id == `${gif.id}-remove-maxgif`){
            removeFavorites(gif);
        }
        if (e.currentTarget.id == `${gif.id}-add-max-gif`){
            addtoFavorites(gif);
        }
        if (e.currentTarget.id == `${gif.id}-download-max-gif`){
            donwloadFavorites(gif);
        }
        if (e.currentTarget.id == `max-gif-button-close`){
            closeMaxGif(gif);
        }
    };
    const handlerEventsForEacrhIcon = document.querySelectorAll(".icons");
    handlerEventsForEacrhIcon.forEach( btn => {
        btn.addEventListener("click",toggleEvent)
    }) 
}

async function createMaxCardComponent(container,gif){
    container.insertAdjacentHTML('beforeend',init(gif));
    events(gif);
}

export default {
    createMaxCardComponent
}