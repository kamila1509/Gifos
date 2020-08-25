
function init(gif){
    const cardView = `
    <div class="trending-card gif-purple-hover">
        <img src="${gif.images.fixed_width.url}" alt="${gif.title}">
        <div class="card">
            <div class="group-icons">
                <div class="icons icon-heart"></div>
                <div class="icons icon-download"></div>
                <div class="icons icon-max"></div>
            </div>
            <div class="gif-text-card">
                <div class="text-cart-user">${gif.username !== '' ? gif.username : 'User' }</div>
                <h3 class="text-card-title">${gif.title}</h3>
            </div>
        </div>
    </div>
    `;
    console.log(cardView);
    return cardView
    
}
function addtoFavorites() {
    console.log('Agregado a Favorites');
}
function events() {
    const favorite = document.getElementById('icon-heart-favorite');
    favorite.addEventListener('click',addtoFavorites)
};
function createCardComponent(gif){
    return init(gif);
    
}

export default {
    createCardComponent
}