import * as mysql from 'mysql2';

let pool = mysql.createPool({
    connectionLimit: 10,
    supportBigNumbers: true,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT
});

pool = pool.promise();

(async () => {
    await pool.getConnection()
    .then(s => console.log('[MYSQL DB CONNECTED]'))
    .catch(e => console.log('Failed to Connect To DB', e));
})();

export default pool;