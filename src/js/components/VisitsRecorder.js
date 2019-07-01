

export default {

    data() {
        return {
            visits: {},
        }
    },
    
    methods: {
    // keep track of visits to each item 
    addVisitRecord(name) {
        Vue.set(this.visits, name, new Date() );
        
        const cacheName = window.idbDatabase.config.VISITS.objectStoreName;
        window.idbDatabase.addOrOverwrite(cacheName, name, {
          name,
          value: new Date(),
          });
  
      },
  
      async loadCachedVisits(){
        const cacheName = window.idbDatabase.config.VISITS.objectStoreName;
        const visits = await window.idbDatabase.getAll(cacheName);
        
        if (visits !== 404) {
          for(let key in visits) {
            let item = visits[key];
            Vue.set(this.visits, item.name, item.value);
          }
        }
  
      },

    }

 }