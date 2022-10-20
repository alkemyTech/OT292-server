require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER || 'dev',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    dialect: 'mysql',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};

const { development } = config;
const { test } = config;
const { production } = config;

export default config;
export { development, test, production };
