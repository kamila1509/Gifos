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
        <img src="./assets/icon-fav-sin-contenido.svg" alt="No-results">
        <p class="gif-no-results-text">"¡Guarda tu primer GIFO en Favoritos <br>
        para que se muestre aquí!"</p>
    </div>
`;
function getFavoriteCards(data) {
    const favoriteContent = document.getElementById('favorite-gifs');
    favoriteContent.innerHTML = ''
    let removeMoreResults =document.getElementById('more-results');
    const favoriteGifData = data ? data : false
    if(!favoriteGifData ){
        favoriteContent.innerHTML = viewNoResults
        favoriteContent.classList.remove('gifs-container');
        removeMoreResults.style.visibility = "hidden";
    }else {
        favoriteGifData.map( function(gif){
            let cart = Card.createCardComponent(favoriteContent,gif)
            return cart
        }).join('')
        removeMoreResults.style.visibility = "visible";
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
let results = 24
function events() {
    const toggle = e => {
        const data = JSON.parse(localStorage.getItem('Favorites'))
        let paginatedItems = data.slice(0, results)
        getFavoriteCards(paginatedItems);
        results = results + 12;
    };
    const moreResults = document.getElementById('more-results');
    moreResults.addEventListener("click",toggle)
    
};
function init(){
    let data = JSON.parse(localStorage.getItem('Favorites'))
    if(data){
        let favorites = data.slice(0,12)
        getFavoriteCards(favorites);
    }else{
        const favoriteContent = document.getElementById('favorite-gifs');
        favoriteContent.innerHTML= viewNoResults
        favoriteContent.classList.remove('gifs-container');
    }
}

function createComponent(container){
    container.innerHTML = viewFavorites;
    init();
    events();
    Trendings.createTrendingComponent(trendingContainer);
    document.getElementById('trending-container').style.visibility = "visible";
    
}

export default {
    createComponent
}