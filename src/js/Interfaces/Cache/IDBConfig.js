

export const IDBConfig = 
    {
        INDEX: {
            objectStoreName: 'pokemon_index',
            options: {
                keyPath: 'url',
                autoIncrement: false,
            }
        },
        DETAIL: {
            objectStoreName: 'pokemon_detail',
            options: {
                keyPath: 'url',
                autoIncrement: false,
            }
        },
};  