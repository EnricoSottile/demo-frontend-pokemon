

class UiHelpers {
    constructor() { }

    /**
     * @param {Date} date
     */
    formatDate(date){
        if (date.constructor !== Date) return date;
        
        return date.toLocaleString('it-IT');
        
    }
 
}

export default UiHelpers