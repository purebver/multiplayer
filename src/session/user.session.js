import User from '../classes/models/user.class.js';
import { userSession } from './sessions.js';

export const addUser = (socket, id, playerId, latency, x, y) => {
  const user = new User(socket, id, playerId, latency, x, y);
  userSession.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSession.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSession.splice(index, 1)[0];
  }
};

export const getAllUser = () => {
  return userSession;
};
