const resolveRoutes = (route) => {
    if (route.includes('favorites')){
        let validRoute ='/favorites';
        return validRoute
    }
    if(route.includes('mygifos')){
        let validRoute = '/mygifos';
        return validRoute
    }
    if(route.includes('newgifo')){
        let validRoute = '/newgifo';
        return validRoute
    }
    else if(route.length <= 3){
        let validRoute = route === '/' ? route : '/'
        return validRoute
    }
};

export default resolveRoutes