import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { IDBConfig } from '@/js/Interfaces/Cache/IDBConfig'

const DB_VERSION = 1;
const DB_NAME = 'Pokemon_IDB';
const CACHE_DURATION_MINUTES = 30;

class IDBDatabase {
    
    constructor(){
        this.config = IDBConfig;
    }


    /**
     * Initializes the database
     */
    async setup() {
        const self = this;
        const db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {

                // creates objectStores
                for(let key in self.config) {
                    let config = self.config[key];
                    if (!db.objectStoreNames.contains(config.objectStoreName)) {
                        db.createObjectStore(config.objectStoreName, config.options);
                    }
                }

            },
        });

    }


    async getAll(objectStoreName){
        const db = await openDB(DB_NAME, DB_VERSION);
        const items = await db.getAll(objectStoreName);

        return items === undefined ? 404 : items;
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
     * @param {String} keyPathString 
     * @param {Object} dataObject 
     */
    async addOrOverwrite(objectStoreName, keyPathString, dataObject){
        const db = await openDB(DB_NAME, DB_VERSION);
        const item = await db.get(objectStoreName, keyPathString);
        
        const decoratedDataObject = {
            ...dataObject,
            date: new Date(), 
        };

        if (item === undefined) {
            await db.add(objectStoreName, decoratedDataObject);
        } else {
            await db.delete(objectStoreName, keyPathString);
            await db.add(objectStoreName, decoratedDataObject);
        }
    }


    /**
     * 
     * @param {String} objectStoreName 
     * 
     * @param {Object} dataObject
     */
    async cacheItem(objectStoreName, dataObject){
        const db = await openDB(DB_NAME, DB_VERSION);
        
        await db.add(objectStoreName, {
            ...dataObject,
            date: new Date(), 
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