const BASE_URL = "https://pokeapi.co/api/v2/";

/**
 * PokeApi endpoints Facade with a simple paginator
 */
class Router {

    constructor(){
        this.routes = this._setRoutes();

    }

    /**
     * Set PokeApi routes 
     */
    _setRoutes(){
        return {
            getAll: 'pokemon/?offset=0&limit=10',
        }
    }

    /**
     * Returns the full route
     * @param {String} routeName 
     */
    getRoute(routeName){
        let route = this.routes[routeName];
        return BASE_URL + route;
    }


    /**
     * Updates the route
     * Used as a really minimal paginator
     * 
     * @param String routeName 
     */
    setRoute(routeName, newRoute){
        newRoute = newRoute.split(BASE_URL)[1];
        this.routes[routeName] = newRoute;
    }

}

export default Router