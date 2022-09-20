"use strict";
require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DB_USER || 'dev',
        password: process.env.DB_PASSWORD || 'dev',
        database: process.env.DB_NAME || 'dev',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
//# sourceMappingURL=config.js.map