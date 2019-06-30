import axios from 'axios'
import Router from './Router';

import IDBDatabase from '@/js/Interfaces/Cache/IDBDatabase';
import { IDBConfig } from '@/js/Interfaces/Cache/IDBConfig'

/**
 * Represents the PokeApi API
 */
class Api {

    constructor(){
        this.router = new Router();
        this.database = new IDBDatabase();

        this.database.setup();
    }




    /**
     * retrieves data from PokeApi
     * returns a chunked list (pagination available and implemented)
     */
     async getAll(){
        let item;
        const url = this.router.getRoute('getAll');
        const cacheName = IDBConfig.INDEX.objectStoreName;

        try {
            item = await this.database.findOrFail(cacheName, url);
           
            if (item === 404) {
                item = await axios.get(url);
                
                await this.database.cacheItem(cacheName, {
                              url,
                              date: new Date(),
                              data: {
                                  next: item.data.next,
                                  results: item.data.results
                              }
                          });

            }
            
            this.router.setRoute('getAll', item.data.next);
            return item;

        } catch (error) {
            throw error;
        }
        
    }


    /**
     * 
     * @param {String} url 
     */
    async getPokemon(url){
        let item;
        const cacheName = IDBConfig.DETAIL.objectStoreName;

        try {
            item = await this.database.findOrFail(cacheName, url);
            if (item === 404) {
                item = await axios.get(url);
                
                await this.database.cacheItem(cacheName, {
                              url,
                              date: new Date(),
                              data: item.data
                          });

            }

            return item;

        } catch (error) {
            throw error;
        }
    }



}

export default Api




// try {
//     const item = await window.idb.findOrFail(CACHE_INDEX_NAME, url);
  
//   } catch (error) {



//       const newItem = await window.idb.cacheItem('pokemon-index', {
//           url: 'abc/ciao/3',
//           date: new Date(),
//           body: '…',
//       });
//   }