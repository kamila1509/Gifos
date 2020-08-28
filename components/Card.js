function init(gif){
    const cardView = `
    <div class="gif-card gif-purple-hover">
        <img src="${gif.images.fixed_width.url}" alt="${gif.title}">
        <div class="card">
            <div class="group-icons">
                <div id="${gif.id}-remove" class="icons icon-delete"></div>
                <div id="${gif.id}-add" class="icons icon-heart"></div>
                <div id="${gif.id}-download" class="icons icon-download"></div>
                <div id="${gif.id}-max" class="icons icon-max"></div>
            </div>
            <div class="gif-text-card">
                <div class="text-cart-user">${gif.username !== '' ? gif.username : 'User' }</div>
                <h3 class="text-card-title">${gif.title}</h3>
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
    document.getElementById(`${gif.id}-add`).classList.add('icon-heart--active')
    addToLocalStorage('Favorites',gif)
}
function removeFavorites(gif) {
    console.log(`removed -${gif.title}`)
}
async function donwloadFavorites(gif){
    let a = document.createElement('a');
    let response = await fetch(`${gif.images.downsized_still.url}`);
    let file = await response.blob();
    a.download = `${gif.title}`;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}
function events(gif){
    const toggleEvent = e => {
        if (e.currentTarget.id == `${gif.id}-remove`){
            removeFavorites(gif);
        }
        if (e.currentTarget.id == `${gif.id}-add`){
            addtoFavorites(gif);
        }
        if (e.currentTarget.id == `${gif.id}-download`){
            donwloadFavorites(gif);
        }
    };
    const handlerEventsForEacrhIcon = document.querySelectorAll(".icons");
    handlerEventsForEacrhIcon.forEach( btn => {
        btn.addEventListener("click",toggleEvent)
    }) 
}
async function createCardComponent(container,gif){
    container.insertAdjacentHTML('beforeend',init(gif));
    events(gif);
}

export default {
    createCardComponent
}