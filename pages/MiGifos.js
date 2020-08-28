const Error404 = () =>{
    const view = ` 
        <div class="Error404">
           <div class="morty-container">
            <div class="morty">
            ERROR 404
            </div>
            </div>
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