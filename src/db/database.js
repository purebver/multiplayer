import mysql from 'mysql2/promise';
import { config } from '../config/config.js';
import { formatDate } from '../utils/formatDate.js';

const { database } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originQuery = pool.query;
  pool.query = (sql, params) => {
    const date = new Date();

    console.log(
      `[${formatDate(date)}] Excuting query ${sql} ${params ? `${JSON.stringify(params)}` : `${date.toISOString()}`}`,
    );
    return originQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  USER_DB: createPool(database.USER_DB),
};

export default pools;
