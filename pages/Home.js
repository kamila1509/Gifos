import Trendings from '../components/Trendings.js'

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
                    <input placeholder="Buscar GIFOS Y más" type="text">
                    <div class="image-container">
                        <i class="fa fa-search"></i>
                    </div>
                </div>
            </div>
            <div class="gifs-sections">
                <span>Trending:</span>
                <p>Reactions, Entertainment, Sports, Stickers, Artists </p>
            </div> 
    `;
    return view
};

export default Home;