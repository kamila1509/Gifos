import Header from '../components/Header.js';
import Favorites from '../pages/Favorites.js';
import Home from '../pages/Home.js';
import getHash from '../utils/getHash.js';
import Error404 from '../pages/Error404.js';
import NewGif from '../pages/NewGif.js';
import MyGifos from '../pages/MiGifos.js';
import resolveRoutes from '../utils/resolveRoutes.js';

const routes = {
    '/':Home,
    '/favorites':Favorites,
    '/mygifos':MyGifos,
    '/newgifo':NewGif
}

const router = async () => {
    const headerContainer = null || document.getElementById('header');
    const content = null || document.getElementById('content');
    Header.createComponent(headerContainer);
    let hash = getHash();
    let route = await resolveRoutes(hash);
    let render = routes[route] ? routes[route] : Error404;
    render.createComponent(content);
}
export default router;
