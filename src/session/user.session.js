import User from '../classes/models/user.class.js';
import { userSession } from './sessions.js';

export const addUser = (sockeet, id, playerId, latency) => {
  const user = new User(sockeet, id, playerId, latency);
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
