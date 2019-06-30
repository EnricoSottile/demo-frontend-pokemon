import { openDB, deleteDB, wrap, unwrap } from 'idb';

const DB_VERSION = 2;
const DB_NAME = 'Pokemon_IDB';
const CACHE_DURATION_MINUTES = 30;

class IDBDatabase {
    


    /**
     * Initializes the database
     */
    async setup() {
        const db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {

                if (!db.objectStoreNames.contains('pokemon_index')) {
                    const store = db.createObjectStore('pokemon_index', {
                        keyPath: 'url',
                        autoIncrement: false,
                    });
                }


            },
        });

        // Add an article:
        // await db.add('pokemon-index', {
        //     title: 'list 1',
        //     url: 'abc/ciao/3',
        //     date: new Date(),
        //     body: '…',
        // });

        // // Add multiple articles in one transaction:
        // {
        //   const tx = db.transaction('articoli', 'readwrite');
        //   tx.store.add({
        //     title: 'Article 2',
        //     date: new Date('2019-01-01'),
        //     body: '…',
        //   });
        //   tx.store.add({
        //     title: 'Article 3',
        //     date: new Date('2019-01-02'),
        //     body: '…',
        //   });
        //   await tx.done;
        // }

        // Get all the articles in date order:
        // console.log(await db.getAllFromIndex('articoli', 'date'));


    }

    // 1) funzione hasCached (se esiste by url e date is in range)
    // return bool or object

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