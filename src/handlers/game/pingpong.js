import Long from 'long';
import { getGameSession } from '../../session/game.session.js';

const pingpongHandler = (socket, userId, payload) => {
  const timestamp = new Long(
    payload.timestamp.low,
    payload.timestamp.high,
    payload.timestamp.unsigned,
  ).toNumber();
  const gameSession = getGameSession();
  const user = gameSession.getUserSocket(socket);
  user.handlePong(timestamp);
};

export default pingpongHandler;
