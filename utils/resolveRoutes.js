const resolveRoutes = (route) => {
    if (route.includes('favorites')){
        let validRoute ='/favorites';
        return validRoute
    }
    if(route.includes('episode/')){
        let validRoute = '/episode/:id';
        return validRoute
    }
    else if(route.length <= 3){
        let validRoute = route === '/' ? route : '/'
        return validRoute
    }
};

export default resolveRoutes