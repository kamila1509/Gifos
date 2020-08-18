import Header from '../components/Header.js';
import Favorites from '../components/Favorites.js';
import Home from '../pages/Home.js';
import getHash from '../utils/getHash.js';
import Error404 from '../pages/Error404.js';
import resolveRoutes from '../utils/resolveRoutes.js';

const routes = {
    '/':Home,
    '/favorites':Favorites
}

const router = async () => {
    const headerContainer = null || document.getElementById('header');
    const content = null || document.getElementById('content');
    Header.createComponent(headerContainer);
    let hash = getHash();
    let route = await resolveRoutes(hash);
    let render = routes[route] ? routes[route] : Error404;
    content.innerHTML = await render();
}
export default router;
