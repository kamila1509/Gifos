import Trendings from '../components/Trendings.js';
import Search from '../components/Search.js';
import Data from '../utils/getData.js';
import Card from '../components/Card.js';

const trendingContainer = null || document.getElementById('trending-container');
const viewHome = `
    <h1 id="main-title" class="main-title">Inspirate, busca, guarda y crea los mejores <span>GIFOS</span></h1>
            <div class="search-container">
                <div id="header-image-container" class="header-image-container">
                    <img src="./assets/ilustra_header.svg" alt="">
                </div>
                <div>${navigator.userAgent}</div>
            </div>
            <div id="search-results" class="gifs-sections">
                <span>Trending:</span>
                <ul id="trending-random" class="trending-random" >Reactions, Entertainment, Sports, Stickers, Artists </ul>
            </div>`;

async function trendingRandom () {
    let trending = await Data.getRandomTrending();
    let trendingSuggestions = document.getElementById('trending-random');
    trendingSuggestions.innerHTML ='';
    for (let i = 0; i <6; i++) {
       trendingSuggestions.innerHTML += `<li class="trend-suggest">${trending.data[i]},</li>`
    }
    const trendSuggest = document.querySelectorAll(".trend-suggest");
        trendSuggest.forEach( li => li.addEventListener("click", event => {
            getTrendingSuggest(event)
    }))
}
const getTrendingSuggest = (e) => {
    let searchTitle = e.currentTarget.textContent
    Search.generateViewResults(searchTitle);
} 
function createComponent(container){
    container.innerHTML = viewHome;
    Trendings.createTrendingComponent(trendingContainer);
    document.getElementById('trending-container').style.visibility = "visible";
    const headerImage = null || document.getElementById('header-image-container');
    Search.createComponent(headerImage);
    trendingRandom();
}
export default {
    createComponent
}
