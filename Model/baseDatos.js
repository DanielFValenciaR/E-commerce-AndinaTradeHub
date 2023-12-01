// Destructuración de objetos de JavaScript para extraer la clase Pool del módulo pg. La biblioteca pg es una biblioteca de Node.js para interactuar con bases de datos PostgreSQL
const { Pool } = require("pg");

// Es una clase que proporciona una piscina de conexiones a la base de datos PostgreSQL
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});


module.exports = pool;