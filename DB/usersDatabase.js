const { Pool } = require('pg');

const usersPool = new Pool({
    user: 'sabrinareddick',
    host: 'localhost',
    database: 'usersdatabase',
    password: 'Sabrina.993344',
    port: 5432,
});

module.exports = usersPool;