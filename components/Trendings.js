import Trending from "../utils/getData.js";

async function init(){
    const trendingGifData = await Trending.getTrending('trending',20);
    const trendingView = `
        <h2 class="trending-title">Trending GIFOS</h2>
        <p class="trending-description">Mira los últimos </p>
        <p class="trending-description">GIFOS de nuestra comunidad</p>
        <div class="carrousel">
            <div class="carrousel-button left"><img src="../assets/button-left.svg" alt=""></div>
            <div class="slider-container">
                <div class="slider__container-content">
                    ${trendingGifData.data.map(gif => `
                        <div class="search-card">
                            <img src="${gif.images.original.url}" alt="">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="carrousel-button right"><img src="../assets/button-right.svg" alt=""></div>
        </div>
    `;
    return trendingView
}

// function events() {
//     const toggleColorMode = e => {
//         if (e.currentTarget.classList.contains("right")){
//             document.querySelector(".slider__container-content").
//             return;
//         }
//             document.documentElement.setAttribute("color-mode","dark");
//     };
//     const toggleButtonsCarrousel = document.querySelectorAll(".carrousel-button");
    
//     toggleButtonsCarrousel.forEach( btn => {
//         btn.addEventListener("click",toggleColorMode)
//     }) 
// };

async function createTrendingComponent(container){
    container.innerHTML = await init();
}

export default {
    createTrendingComponent
}