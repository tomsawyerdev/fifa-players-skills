var mysql = require('mysql2/promise');
var db;

const fetchdata = async () => {
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'apiuser',
  database: 'fifa',
  password: 'supersecret'
});
 sql='SELECT long_name FROM `players` LIMIT 100;'
//hex()
 sql='SELECT "áéíó ú ü ñ, Ñ ć ță š öÇ古雅沙李冬娜" as leters '    
try {
  const [results, fields] = await connection.query(sql);

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}

}
//db=connect();
fetchdata(); 

