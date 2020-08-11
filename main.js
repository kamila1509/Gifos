if (window.CSS && CSS.supports("color", "var(--primary)")) {
   const toggleColorMode = e => {
    if (e.currentTarget.classList.contains("light--hidden")){
        document.documentElement.setAttribute("color-mode","light");
        localStorage.setItem("color-mode", "light");
        return;
    }
        localStorage.setItem("color-mode", "dark");
        document.documentElement.setAttribute("color-mode","dark");
    };

    const toggleColorButtons = document.querySelectorAll(".color-mode_btn");
    toggleColorButtons.forEach( btn => {
        btn.addEventListener("click",toggleColorMode)
    }) 
}
