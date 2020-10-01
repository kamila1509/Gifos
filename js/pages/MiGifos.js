
import Trendings from '../components/Trendings.js';
import Card from "../components/Card.js"; 
import Data from '../utils/getData.js';

const trendingContainer = null || document.getElementById('trending-container');
const viewMyGifs = `
<div class="center">
            <img src="./assets/icon-mis-gifos.svg" alt="">
            <h1 class="main-title">Mis GIFOS</h1>
        </div>
        <div id="mygifos-gifs" class="gifs-container gif-mygifs-section">
            
        </div>
        <div id="more-results" class="button">
            Ver más
        </div> 
`;
const viewNoResults = `
    <div class="gif-no-results">
        <img src="./assets/icon-mis-gifos-sin-contenido.svg" alt="No-results">
        <p class="gif-no-results-text">¡Animate a crear tu primer GIFO!</p>
    </div>
`;
async function getFavoriteCards(data) {
    const miGifContent = document.getElementById('mygifos-gifs');
    miGifContent.innerHTML=''
    let removeMoreResults =document.getElementById('more-results');
    const myGifData = data ? data : false
    if(!myGifData){
        removeMoreResults.style.visibility = "hidden";
        miGifContent.innerHTML = viewNoResults
        miGifContent.classList.remove('gifs-container');
        
    }else {
        myGifData.map(function(gif){
            let cart = Card.createCardComponent(miGifContent,gif)
            return cart
        }).join('')
        removeMoreResults.style.visibility = "visible";
    }
    let removeFavoriteIcon = document.querySelectorAll('#mygifos-gifs .icon-heart');
    removeFavoriteIcon.forEach(btn => 
        btn.style.display = 'none'
    )
    let addTrashIcon = document.querySelectorAll('#mygifos-gifs .icon-delete');
    addTrashIcon.forEach(btn=>
        btn.style.visibility = 'visible'    
    )
    
}

let results = 24
function events() {
    const toggle = e => {
        const data = JSON.parse(localStorage.getItem('MyGifData'));
        let paginatedItems = data.slice(0, results)
        getFavoriteCards(paginatedItems);
        results = results + 12;
    };
    const moreResults = document.getElementById('more-results');
    moreResults.addEventListener("click",toggle)
    
};
function init(){
    const data = JSON.parse(localStorage.getItem('MyGifData'));
    if(data){
        let myGifs = data.slice(0,12)
        getFavoriteCards(myGifs);
    }else{
        const miGifContent = document.getElementById('mygifos-gifs');
        miGifContent.innerHTML = viewNoResults
        miGifContent.classList.remove('gifs-container');
    }
}
function createComponent(container) {
    container.innerHTML = viewMyGifs;
    Trendings.createTrendingComponent(trendingContainer)
    init()
    events()
    
}
export default {
    createComponent
};