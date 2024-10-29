export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE device_id = ?',
  CREATE_USER: 'INSERT INTO user (device_id) VALUES (?)',
  UPDATE_USER:
    'UPDATE user SET last_login = CURRENT_TIMESTAMP, last_x = ?, last_y = ? WHERE device_id = ?',
};
