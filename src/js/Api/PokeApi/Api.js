import axios from 'axios'
import Router from './Router';



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
            return error.response;
        }
    }



}

export default Api