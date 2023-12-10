const { Pool } = require('pg');

const pool = new Pool({
    user: 'gabriela',
    host: 'itcpostgresql.postgres.database.azure.com',
    database: 'db009',
    password: '%&unsas_aew27009',
    port: 5432,
    ssl: true
});

const showVacinasCount = async() => {
    const result = await pool.query('');
    console.log(result.rows);
}
console.log(pool.options.user);
console.log(pool.options.database);
showVacinasCount();

module.exports = pool;
