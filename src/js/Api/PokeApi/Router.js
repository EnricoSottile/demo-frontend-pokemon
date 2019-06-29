const baseUrl = "https://pokeapi.co/api/v2/";

class Router {

    constructor(){
        this.routes = this._setRoutes();

    }

    /**
     * Set PokeApi routes 
     */
    _setRoutes(){
        return {
            getAll: 'pokemon/?offset=0&limit=20',
        }
    }

    /**
     * Returns the full route
     * @param String routeName 
     */
    getRoute(routeName){
        let route = this.routes[routeName];
        return baseUrl + route;
    }


    /**
     * Updates the route
     * Used as a really minimal paginator
     * 
     * @param String routeName 
     */
    setRoute(routeName, newRoute){
        newRoute = newRoute.split(baseUrl)[1];
        this.routes[routeName] = newRoute;
    }

}

export default Router