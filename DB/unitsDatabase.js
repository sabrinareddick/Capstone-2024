const { Pool } = require('pg');

const unitsPool = new Pool({
    user: 'sabrinareddick',
    host: 'localhost',
    database: 'unitsdatabase',
    password: 'Sabrina.993344',
    port: 5432,
});

module.exports = unitsPool;
