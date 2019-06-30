import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { IDBConfig } from '@/js/Interfaces/Cache/IDBConfig'

const DB_VERSION = 1;
const DB_NAME = 'Pokemon_IDB';
const CACHE_DURATION_MINUTES = 30;

class IDBDatabase {
    


    /**
     * Initializes the database
     */
    async setup() {
        const db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {

                // creates objectStores
                for(let key in IDBConfig) {
                    let config = IDBConfig[key];
                    if (!db.objectStoreNames.contains(config.objectStoreName)) {
                        db.createObjectStore(config.objectStoreName, config.options);
                    }
                }

            },
        });



    }


    /**
     * Looks for a resource in the Db
     * and returns the cached item if it's found
     * and is younger than the set cache's max time duration
     * 
     * 
     * @param {String} objectStoreName 
     * @param {String} keyPathString 
     */
    async findOrFail(objectStoreName, keyPathString) {
        const db = await openDB(DB_NAME, DB_VERSION);
        const item = await db.get(objectStoreName, keyPathString);

        if (item === undefined) {
            return 404;
        }
        
        const diffByMinutes = this._datesDiffByMinutes(item.date, new Date());
        if (diffByMinutes > CACHE_DURATION_MINUTES) {
            await db.delete(objectStoreName, keyPathString);
            return 404;
        }    

        return item;
    }


    /**
     * 
     * @param {String} objectStoreName 
     * 
     * @param {String} url
     * @param {Date} date
     * @param {Mixed} data
     */
    async cacheItem(objectStoreName, {url, date, data}){
        const db = await openDB(DB_NAME, DB_VERSION);
        
        await db.add(objectStoreName, {
            url,
            date, 
            data
        });
    }




    /**
     * 
     * @param {Date} startDate 
     * @param {Date} endDate 
     */
    _datesDiffByMinutes(startDate, endDate) {
        const diff = Math.abs(endDate - startDate);
        return Math.floor( (diff/1000) / 60 );
    }

}

export default IDBDatabase