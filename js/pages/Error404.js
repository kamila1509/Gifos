const Error404 = () =>{
    const view = ` 
    <div class="gif-no-results">
        <img src="./assets/icon-busqueda-sin-resultado.svg" alt="No-results">
        <p class="gif-no-results-text">Try Another Page</p>
    </div>
    `;
    return view;
};
function createComponent(container) {
    container.innerHTML = Error404();
}
export default {
    createComponent
};