const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
   connectionLimit: 50,
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: 'Phucarus112',
   database: 'online_auction',
   insecureAuth : true
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {

   load: sql => mysql_query(sql),
   loadUser: sql => mysql_query(sql),
   detail: sql => mysql_query(sql),
   add: (tableName,entity) => mysql_query(`insert into ${tableName} set ?`,entity),
   del: (tableName,condition) => mysql_query(`delete from ${tableName} where ?`,condition),
   patch: (tableName,entity,condition) => mysql_query(`update ${tableName} set ? where ?`,[entity,condition]),
   addWatchList: (tableName,entity) => mysql_query(`insert into ${tableName} set ?`,entity),
 };