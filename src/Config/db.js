require('dotenv').config();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const dbpath = process.env.DB_PATH;

const createConnection = async () => {

    console.log("Connection established");
    return await sqlite.open({
        filename: dbpath,
        driver: sqlite3.Database
    });    
}

module.exports =  {
    createConnection
}