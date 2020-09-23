
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
    const myGifData = data ? data : false
    if(!myGifData){
        miGifContent.innerHTML = viewNoResults
        miGifContent.classList.remove('gifs-container');
    }else {
        myGifData.map(function(gif){
            let cart = Card.createCardComponent(miGifContent,gif)
            return cart
        }).join('')
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
function getMyGifosData() {
    let dataGif = [];
    const data = JSON.parse(localStorage.getItem('MyGifs'));
    if(data){
        data.map(async function(id){
            let gifid = await Data.getGifById(id);
            dataGif.push(gifid.data);
        });
    }else {
        dataGif = null
    }
    return dataGif
}
function createComponent(container) {
    container.innerHTML = viewMyGifs;
    let data = getMyGifosData();
    Trendings.createTrendingComponent(trendingContainer)
    setTimeout(()=>{
        getFavoriteCards(data)
    },500)
    
}
export default {
    createComponent
};