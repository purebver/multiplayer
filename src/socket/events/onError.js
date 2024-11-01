import { updateUser } from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { removeUser } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { errorHandler } from '../../utils/error/errorHandler.js';

export const onError = (socket) => (e) => {
  // 게임세션에서 유저를 찾아 유저를 제거
  const gameSession = getGameSession();
  const user = gameSession.getUserSocket(socket);
  updateUser(user.x, user.y, user.id);
  gameSession.removeUser(socket);
  removeUser(socket);
  if (e.code === 'ECONNRESET') {
    console.error('클라이언트의 강제 종료');
    return;
  }
  errorHandler(socket, new CustomError(500, `소켓오류: ${e.message}`));
};
