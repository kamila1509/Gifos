import Trendings from '../components/Trendings.js';
import Data from '../utils/getData.js';

const trendingContainer = null || document.getElementById('trending-container');


const Home = () => {
    Trendings.createTrendingComponent(trendingContainer);
    const view = `
    <h1 id="main-title" class="main-title">Inspirate, busca, guarda y crea los mejores <span>GIFOS</span></h1>
            <div class="search-container">
                <div class="header-image-container">
                    <img src="./assets/ilustra_header.svg" alt="">
                </div>
                <div class="search">
                    <div class="search-bar">
                        <input id="input-search" class="search-input" placeholder="Buscar GIFOS Y más" type="text">
                        <div class="image-container">
                            <i id="fa-search" class="fa fa-search"></i>
                        </div>
                    </div>
                    <div id="list-suggestions">
                    </div>
                </div>
            </div>
            <div id="search-results" class="gifs-sections">
                <span>Trending:</span>
                <p>Reactions, Entertainment, Sports, Stickers, Artists </p>
            </div>
    `;
    setTimeout(()=>{
        searchAutocomplete();
    },200)
    return view
};
 function searchAutocomplete() {
    const inputSearch = document.getElementById('input-search');
    inputSearch.addEventListener("keyup", async (event) => {
        let suggestion = await Data.getAutocomplete(inputSearch.value);
        const list = document.getElementById('list-suggestions');
        const view = `
        <ul class="list-suggestions">
            ${suggestion.data.map(item => `
                <li class="option-list"><i class="fa fa-search"></i>${item.name}</li>
            `).join('')}
        </ul>
        `;
        list.innerHTML = view
        const optionList = document.querySelectorAll(".option-list");
        optionList.forEach( li => li.addEventListener("click",searchGifoSuggested))
        let search = document.getElementById('fa-search');
        search.addEventListener("click",searchText)

        
    })
}
function searchText() {
    let search = document.getElementById('input-search');
    generateViewResults(search.value);
}
const searchGifoSuggested = async(e) => {
    console.log(e.currentTarget);
    let searchTitle = e.currentTarget.textContent
    let inputSearch = document.getElementById('input-search');
    inputSearch.value = e.currentTarget.textContent;
    let list = document.getElementById('list-suggestions');
    list.innerHTML = '';
    generateViewResults(searchTitle);
    console.log(generateViewResults(searchTitle));
}

async function generateViewResults (textSearch) {
    let searchResults = await Data.getSearch('search',12,textSearch);
    console.log(searchResults.data.length);
    let giftSection = document.getElementById('search-results');
    const viewGifs = `
        <div class="center">
        <h1 class="main-title">${textSearch}</h1>
        </div>
        <div class="gifs-container">
            ${searchResults.data.map(gif => `
                <div class="gif-result">
                <img src="${gif.images.original.url}" alt="${gif.title}">
                </div>   
            `).join('')}         
        </div>
        <div class="button">
            <a href="">Ver más</a>
        </div> 
    `;
    const viewNoResults = `
        <div class="center">
        <h1 class="main-title">${textSearch}</h1>
        </div>
        <div class="gif-no-results">
            <img src="./assets/icon-busqueda-sin-resultado.svg" alt="">
            <p>Intenta con otra búsqueda</p>
        </div>
    `;
    if( searchResults.data.length !== 0 ){
        giftSection.innerHTML = viewGifs
    } else {
        giftSection.innerHTML = viewNoResults
    }
    

}

export default Home;