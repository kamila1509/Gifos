import Trending from "../utils/getData.js";
import Card from "./Card.js";

function init(){
    const trendingView = `
        <h2 class="trending-title">Trending GIFOS</h2>
        <p class="trending-description">Mira los últimos </p>
        <p class="trending-description">GIFOS de nuestra comunidad</p>
        <div class="carrousel">
            <div class="carrousel-button left"><i class="fa fa-chevron-left"></i></div>
            <div id="slider__container" class="slider-container">
                <div id="slider__container-content" class="slider__container-content">
                    
                </div>
            </div>
            <div class="carrousel-button right"><i class="fa fa-chevron-right"></i></div>
        </div>
    `;
    return trendingView
}
let scrollright = 0
function events() {
    const toggle = e => {
        let carrousel =  document.getElementById("slider__container");
        if (e.currentTarget.classList.contains("right")){
            scrollright = scrollright+300;
            carrousel.scroll(scrollright,0)
            return;
        }
        scrollright = scrollright-300
        carrousel.scroll(scrollright,0)
    };
    const toggleButtonsCarrousel = document.querySelectorAll(".carrousel-button"); 
    toggleButtonsCarrousel.forEach( btn => {
        btn.addEventListener("click",toggle)
    }) 
};

async function getTredingCards() {
    const sliderContent = document.getElementById('slider__container-content')
    const trendingGifData = await Trending.getTrending('trending',12);
    trendingGifData.data.map( function(gif){
        let cart = Card.createCardComponent(sliderContent,gif)
        return cart
    }).join('')
}

 function createTrendingComponent(container){
    container.innerHTML =  init();
    events();
    getTredingCards();
}

export default {
    createTrendingComponent
}