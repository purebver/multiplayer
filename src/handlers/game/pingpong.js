import Long from 'long';
import { getGameSession } from '../../session/game.session.js';

const pingpongHandler = (socket, userId, payload) => {
  //롱타입을 js에서 사용할 수 있게 변환
  const timestamp = new Long(
    payload.timestamp.low,
    payload.timestamp.high,
    payload.timestamp.unsigned,
  ).toNumber();

  //소켓으로 유저를 검색해 latency를 측정
  const gameSession = getGameSession();
  const user = gameSession.getUserSocket(socket);
  user.handlePong(timestamp);
};

export default pingpongHandler;
