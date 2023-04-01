const Client = require('pg').Client;

const client = new Client({
    user: 'fando',
    host: 'localhost',
    database: 'el_doc',
    password: 'root',
    port: 32771
  });
  client.connect();
   
  
const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    client.end();
  })
}

module.exports = {
  getUsers
}