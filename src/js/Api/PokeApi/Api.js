import axios from 'axios'
import Router from './Router';


/**
 * Represents the PokeApi API
 */
class Api {

    constructor(){
        this.router = new Router;
    }




    /**
     * retrieves data from PokeApi
     * returns a chunked list (pagination available)
     */
     async getAll(){
        let url = this.router.getRoute('getAll');
        
        try {
            const response = await axios.get(url);
            this.router.setRoute('getAll', response.data.next);
            return response
        } catch (error) {
            throw error;
        }
        
    }

    /**
     * 
     * @param {String} url 
     */
    async getPokemon(url){
        try {
            const response = await axios.get(url);
            return response
        } catch (error) {
            throw error;
        }
    }



}

export default Api