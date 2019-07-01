import axios from 'axios'
import Router from './Router';

/**
 * 
 * Represents the PokeApi API
 */
class Api {

    constructor(){
        this.router = new Router();
        this.database = window.idbDatabase;
    }




    /**
     * retrieves data from PokeApi
     * returns a chunked list (pagination available and implemented)
     */
     async getAll(){
        const url = this.router.getRoute('getAll');
        const cacheName = this.database.config.INDEX.objectStoreName;

        try {
            const item = await this._getLiveOrCached(cacheName, url);            
            this.router.setRoute('getAll', item.data.next);
            return item;
        } catch (error) {
            throw error;
        }
        
    }


    /**
     * retrieves data from PokeApi
     * returns an object
     * 
     * @param {String} url 
     */
    async getPokemon(url){
        const cacheName = this.database.config.DETAIL.objectStoreName;

        try {
            const item = await this._getLiveOrCached(cacheName, url);
            return item;
        } catch (error) {
            throw error;
        }
    }



    /**
     * Dry/helper function for get requests
     * Returns cached item if found
     * Else returns a live one then caches it
     * 
     * @param {String} cacheName 
     * @param {String} url 
     */
    async _getLiveOrCached(cacheName, url){
        let item = await this.database.findOrFail(cacheName, url);
           
        if (item === 404) {
            item = await axios.get(url);
            
            await this.database.cacheItem(cacheName, {
                          url,
                          data: item.data
                      });
        }
        
        return item;
    }



}

export default Api
