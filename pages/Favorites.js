import Card from "../components/Card.js"; 
import Trendings from '../components/Trendings.js';
const trendingContainer = null || document.getElementById('trending-container');
const viewFavorites = `
<div class="center">
            <img src="./assets/icon-favoritos.svg" alt="">
            <h1 class="main-title">Favoritos</h1>
        </div>
        <div id="favorite-gifs" class="gifs-container gif-favorite-section">
            
        </div>
        <div id="more-results" class="button">
            Ver más
        </div> 
`;

const viewNoResults = `
    <div class="gif-no-results">
        <img src="./assets/icon-busqueda-sin-resultado.svg" alt="No-results">
        <p class="gif-no-results-text">Intenta con otra búsqueda</p>
    </div>
`;
function getFavoriteCards() {
    const favoriteContent = document.getElementById('favorite-gifs');
    const data = JSON.parse(localStorage.getItem('Favorites'))
    console.log(data);
    const trendingGifData = data ? data : false
    if(!trendingGifData ){
        favoriteContent.innerHTML = viewNoResults
        favoriteContent.classList.remove('gifs-container');
    }else {
        trendingGifData.map( function(gif){
            let cart = Card.createCardComponent(favoriteContent,gif)
            return cart
        }).join('')
    }
    let removeFavoriteIcon = document.querySelectorAll('#favorite-gifs .icon-heart');
    removeFavoriteIcon.forEach(btn => 
        btn.style.display = 'none'
    )
    let addTrashIcon = document.querySelectorAll('#favorite-gifs .icon-delete');
    addTrashIcon.forEach(btn=>
        btn.style.visibility = 'visible'    
    )
    
}

function createComponent(container){
    container.innerHTML = viewFavorites;
    getFavoriteCards();
    Trendings.createTrendingComponent(trendingContainer);
    document.getElementById('trending-container').style.visibility = "visible";
    
}

export default {
    createComponent
}