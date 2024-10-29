import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pools from '../database.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  const queries = sql
    .split(';')
    .map((query) => query.trim())
    .filter((query) => query.length > 0);

  for (const query of queries) {
    await pool.query(query);
  }
};

const createSchemas = async () => {
  const sqlDir = path.join(__dirname, '../sql');
  try {
    await executeSqlFile(pools.USER_DB, path.join(sqlDir, 'user_db.sql'));
  } catch (e) {
    throw CustomError(
      ErrorCodes.DB_MIGRATION_ERROR,
      `데이터베이스 테이블 생성 중 오류가 발생했습니다 ${e}`,
    );
  }
};

const execution = async () => {
  try {
    await createSchemas();
    console.log('데이터 마이그레이션 완료');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

execution();
