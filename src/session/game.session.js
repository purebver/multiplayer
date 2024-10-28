import Game from '../classes/models/game.class.js';
import { gameSession } from './sessions.js';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSession.push(session);
  return session;
};

// export const removeGameSession = (id) => {
//   const index = gameSession.findIndex((game) => game.id === id);
//   if (index !== -1) {
//     return gameSession.splice(index, 1);
//   }
// };

// export const getGameSession = (id) => {
//   return gameSession.find((game) => game.id === id);
// };

export const removeGameSession = () => {
  return gameSession.splice(0, 1);
};

export const getGameSession = () => {
  return gameSession[0];
};

export const getAllGameSession = () => {
  return gameSession;
};
