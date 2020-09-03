
import Trendings from '../components/Trendings.js';

const trendingContainer = null || document.getElementById('trending-container');
const viewMyGifs = `
<div class="center">
            <img src="./assets/icon-mis-gifos.svg" alt="">
            <h1 class="main-title">Mis GIFOS</h1>
        </div>
        <div id="favorite-gifs" class="gifs-container gif-favorite-section">
            
        </div>
        <div id="more-results" class="button">
            Ver más
        </div> 
`;
function createComponent(container) {
    container.innerHTML = viewMyGifs;
    Trendings.createTrendingComponent(trendingContainer)
}
export default {
    createComponent
};