import Data from '../utils/getData.js';
import Card from "../components/Card.js";

function viewSearch (uniqueId) {
    return `
    <div id="search-${uniqueId}" class="search">
    <div class="search-bar">
        <input id="input-search-${uniqueId}" class="search-input" placeholder="Buscar GIFOS Y más" type="text">
        <div class="image-container">
            <i id="fa-search-${uniqueId}" class="fa fa-search"></i>
        </div>
    </div>
    <div id="list-suggestions-${uniqueId}">
    </div>
    </div>
`;
}
function searchAutocomplete(uniqueId) {
    const inputSearch = document.getElementById(`input-search-${uniqueId}`);
    
    inputSearch.addEventListener("keyup", async (event) => {
        let suggestion = await Data.getAutocomplete(inputSearch.value);
        const list = document.getElementById(`list-suggestions-${uniqueId}`);
        const view = `
        <ul class="list-suggestions">
            ${suggestion.data.map(item => `
                <li class="option-list"><i class="fa fa-search"></i>${item.name}</li>
            `).join('')}
        </ul>
        `;
        if(suggestion.data.length !== 0 ){
            list.innerHTML = view
        }else{
            list.innerHTML = ''
        }
        
        const optionList = document.querySelectorAll(".option-list");
        optionList.forEach( li => li.addEventListener("click", event => {
            searchGifoSuggested(event, uniqueId)
        }))
        let search = document.getElementById(`fa-search-${uniqueId}`);
        search.addEventListener("click", () => {
            searchText(uniqueId)
        })
    })
}
function searchText(uniqueId) {
    let search = document.getElementById(`input-search-${uniqueId}`);
    generateViewResults(search.value);
}

const searchGifoSuggested = (e,uniqueId) => {
    let searchTitle = e.currentTarget.textContent
    let inputSearch = document.getElementById(`input-search-${uniqueId}`);
    inputSearch.value = e.currentTarget.textContent;
    let list = document.getElementById(`list-suggestions-${uniqueId}`);
    list.innerHTML = '';
    generateViewResults(searchTitle);
}
let pag = 12 ;
async function searchMoreResults(textSearch) {
    let searchResults = await Data.getSearch('search',12,textSearch,pag);
    pag = pag + 12;
    let gifsContainer = document.getElementById('gifs-container');
    searchResults.data.map( function(gif){
        let cart = Card.createCardComponent(gifsContainer,gif)
        return cart
    }).join('')
}

async function generateViewResults (textSearch) {
    let searchResults = await Data.getSearch('search',12,textSearch,0);
    let giftSection = document.getElementById('search-results');
    const viewGifs = `
        <div class="center">
        <h1 class="main-title">${textSearch}</h1>
        </div>
        <div id="gifs-container" class="gifs-container gifs-container-search-results">           
        </div>
        <div id="more-results" class="button">
            Ver más
        </div> 
    `;
    const viewNoResults = `
        <div class="center">
        <h1 class="main-title">${textSearch}</h1>
        </div>
        <div class="gif-no-results">
            <img src="./assets/icon-busqueda-sin-resultado.svg" alt="No-results">
            <p>Intenta con otra búsqueda</p>
        </div>
    `;
    if( searchResults.data.length !== 0 ){
        giftSection.innerHTML = viewGifs
        let gifsContainer = document.getElementById('gifs-container')
        searchResults.data.map( function(gif){
            let cart = Card.createCardComponent(gifsContainer,gif)
            return cart
        }).join('')
        let moreResults = document.getElementById('more-results')
        moreResults.addEventListener("click", function(){
            searchMoreResults(textSearch);
        })
    } else {
        giftSection.innerHTML = viewNoResults
    }
    
}

function createComponent(container) {
    const uniqueId = Date.now()
    container.insertAdjacentHTML('afterend',viewSearch(uniqueId));
    searchAutocomplete(uniqueId);
}

export default {
    createComponent,
    generateViewResults
}