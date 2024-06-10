const mysql = require('mysql');

let connection;

const initializeDatabase = async () => {
  const serverConnection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
  });

  return new Promise((resolve, reject) => {
    serverConnection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL server:', err);
        return reject(err);
      }
      console.log('Connected to MySQL server');

      serverConnection.query('CREATE DATABASE IF NOT EXISTS fullcycle', (err) => {
        if (err) {
          console.error('Error creating database:', err);
          return reject(err);
        }
        console.log('Database created or already exists');

        serverConnection.end((err) => {
          if (err) {
            console.error('Error closing server connection:', err);
            return reject(err);
          }

          connection = mysql.createConnection({
            host: 'db',
            user: 'root',
            password: 'root',
            database: 'fullcycle',
          });

          connection.connect((err) => {
            if (err) {
              console.error('Error connecting to MySQL database:', err);
              return reject(err);
            }
            console.log('Connected to MySQL database');

            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS people (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
              )
            `;

            connection.query(createTableQuery, (err) => {
              if (err) {
                console.error('Error creating table:', err);
                return reject(err);
              }
              console.log('Table created or already exists');
              resolve(connection);
            });
          });
        });
      });
    });
  });
};

module.exports = {
  initializeDatabase,
  getConnection: () => connection,
};
