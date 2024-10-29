import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserByDeviceId = async (deviceId) => {
  const [raws] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [deviceId]);
  console.log(raws);
  return raws.length > 0 ? raws[0] : null;
};

export const createUser = async (deviceId) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
  return deviceId;
};

export const updateUser = async (x, y, deviceId) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER, [x, y, deviceId]);
};
