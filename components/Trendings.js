import Trending from "../utils/getData.js";

async function init(){
    const trendingGifData = await Trending.getTrending('trending',20);
    console.log(trendingGifData.data);
    const trendingView = `
        <h2 class="trending-title">Trending GIFOS</h2>
        <p class="trending-description">Mira los últimos </p>
        <p class="trending-description">GIFOS de nuestra comunidad</p>
        <div class="carrousel">
            <div class="carrousel-button left"><i class="fa fa-chevron-left"></i></div>
            <div id="slider__container" class="slider-container">
                <div id="slider__container-content" class="slider__container-content">
                    ${trendingGifData.data.map(gif => `
                        <div class="search-card">
                            <img src="${gif.images.fixed_width.url}" alt="">
                        </div>
                    `).join('')}
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

async function createTrendingComponent(container){
    container.innerHTML = await init();
    events();
}

export default {
    createTrendingComponent
}