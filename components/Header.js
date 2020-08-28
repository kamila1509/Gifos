const headerView = `
    <input type="checkbox" id="burger-shower" class="burger-shower">
    <div class="header-navigation">
        <a class="home-link" href="#"><div class="logo-container"></div></a>
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

function createComponent(container) {
    container.innerHTML = headerView;
    init();
}

export default {
    createComponent
};