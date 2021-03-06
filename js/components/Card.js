import MaxGif from './Maxgif.js'
function init(gif){
    const cardView = `
    <div id="${gif.id}" class="gif-card gif-purple-hover">
        <img loading="lazy" src="${gif.images.fixed_width.webp}" alt="${gif.title}">
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
    let heart = document.getElementById(`${gif.id}-add`)
    if(heart.classList.contains('icon-heart--active')){
        heart.classList.remove('icon-heart--active')
        let data = JSON.parse(localStorage.getItem('Favorites'))
        data.forEach((ítem,index) => ítem.id === gif.id ? data.splice(index,1): null)
        localStorage.setItem('Favorites',JSON.stringify(data))
    }else{
        heart.classList.add('icon-heart--active')
        addToLocalStorage('Favorites',gif)
    }

}
function removeFavorites(gif) {
    let data = JSON.parse(localStorage.getItem('Favorites'))
    data.forEach((ítem,index) => ítem.id === gif.id ? data.splice(index,1): null)
    localStorage.setItem('Favorites',JSON.stringify(data))
    document.getElementById(gif.id).remove()
}
async function donwloadFavorites(gif){
    let a = document.createElement('a');
    let response = await fetch(`${gif.images.downsized.url}`);
    let file = await response.blob();
    a.download = `${gif.title}`;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}
function fullScreenCard(gif){
    let container = document.getElementById('main-container');
    window.scrollTo(0,0);
    MaxGif.createMaxCardComponent(container,gif);
    document.body.style.overflow = 'hidden'
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
        if (e.currentTarget.id == `${gif.id}-max`){
            fullScreenCard(gif);
        }
    };
    const handlerEventsForEacrhIcon = document.querySelectorAll(".icons");
    handlerEventsForEacrhIcon.forEach( btn => {
        btn.addEventListener("click",toggleEvent)
    }) 
    const cardMaxonMobile = document.getElementById(gif.id);
    cardMaxonMobile.addEventListener("click",function(){
        if(isMobile()){
            fullScreenCard(gif)
        }
    })
}

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

function hideControllers() {
    if(isMobile()){
        let card = document.querySelectorAll('.card');
        card.forEach(item => item.style.display = 'none')
    }
}
async function createCardComponent(container,gif){
    container.insertAdjacentHTML('beforeend',init(gif));
    events(gif);
    hideControllers();
}

export default {
    createCardComponent
}