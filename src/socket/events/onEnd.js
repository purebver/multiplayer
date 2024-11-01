import { updateUser } from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { removeUser } from '../../session/user.session.js';

export const onEnd = (socket) => () => {
  // 게임세션에서 유저를 찾아 유저를 제거
  const gameSession = getGameSession();
  const user = gameSession.getUserSocket(socket);
  updateUser(user.x, user.y, user.id);
  gameSession.removeUser(socket);
  removeUser(socket);
  console.log('클라이언트 연결이 종료되었습니다.');
};
