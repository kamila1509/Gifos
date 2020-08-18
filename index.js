import router from './routes/index.js';
window.addEventListener('load',router);
window.addEventListener('hashchange',router);

// setTimeout(()=> {
//     let title = document.getElementById("main-title");
//     title.addEventListener("click", () => {
//         if(!localStorage.getItem(newtext)){
//             let newtext = prompt ("Ingrese nuevo titulo");
//             localStorage.setItem("newtitle", newtext);
//             title.innerHTML = newtext;
//         }
//         let data = localStorage.getItem(newtext)
//         title.innerHTML = data;
        
//     })
// },500)