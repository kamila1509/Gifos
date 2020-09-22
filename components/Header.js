import Search from '../components/Search.js';
const headerView = `
    <input type="checkbox" id="burger-shower" class="burger-shower">
    <div id="header-navigation" class="header-navigation">
        <a id="home-link" class="home-link" href="#"><div class="logo-container"></div></a>
        <label for="burger-shower" class="hamburger"></label>
        <div class="nav-full">
            <nav class="navigation">
                <ul class="navigation-list">
                    <li class="color-mode_btn light--hidden"><a>Modo Diurno</a></li>
                    <hr class="light--hidden">
                    <li class="color-mode_btn dark--hidden"><a>Modo Nocturno</a></li>
                    <hr class="dark--hidden">
                    <li><a href="#/favorites">Favoritos</a></li>
                    <hr>
                    <li><a href="#/mygifos">Mis GIFos</a></li>
                    <hr>
                    <li class="onMobile"><a href="#/newgifo" >Create GIF</a></li>
                    <hr class="onMobile">
                    <li class="onDesktop"><a class="new-gif-link" href="#/newgifo">+</a></li>
                </ul>
            </nav>
        </div>
    </div>
`;

function init() {
    const toggleColorMode = e => {
        if (e.currentTarget.classList.contains("light--hidden")){
            document.documentElement.setAttribute("color-mode","light");
            localStorage.setItem("color-mode", "light");
            document.getElementsByTagName('meta')["theme-color"].content = "#572EE5";
            return;
        }
            localStorage.setItem("color-mode", "dark");
            document.documentElement.setAttribute("color-mode","dark");
            document.getElementsByTagName('meta')["theme-color"].content = "#37383C";
    };
    const toggleColorButtons = document.querySelectorAll(".color-mode_btn");
    
    toggleColorButtons.forEach( btn => {
        btn.addEventListener("click",toggleColorMode)
    }) 
};
function detectScroll() {
    let header = document.getElementById('header-navigation');
    document.addEventListener('scroll',function(){
        if(window.scrollY >= 1){
            header.classList.add("box-shadow-header");
            //removeInputSearch(header)
            insertSearch();
            let search = header.children[1]
            search.style.display = "block";

        }else{
            header.classList.remove('box-shadow-header');
            let search = header.children[1]
            search.style.display = "none";

        }
    })
}
//Check If there an existent input in the header 
function insertSearch() {
    let header = document.getElementById('header-navigation');
    let SearchHeader = null || header.getElementsByClassName('search');
    const home_link = document.getElementById('home-link');
    if(SearchHeader.length < 1 && !isMobile()){
        Search.createComponent(home_link)
    }
}
// Function for remove input that is not necesary
// function removeInputSearch(header){
//     let remove = header.getElementsByClassName('search')[0]
//     if(remove){
//         remove.parentNode.removeChild(remove)
//     }
// }
function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}
function createComponent(container) {
    container.innerHTML = headerView;
    init();
    detectScroll();
}

export default {
    createComponent
};