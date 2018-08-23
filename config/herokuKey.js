const pg = require("pg");
var parse = require('pg-connection-string').parse;
var config = parse(process.env.DATABASE_URL)

const pool = new pg.Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: true
});

module.exports.pool = pool; 