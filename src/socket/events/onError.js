import { getGameSession } from '../../session/game.session.js';
import { removeUser } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { errorHandler } from '../../utils/error/errorHandler.js';

export const onError = (socket) => (e) => {
  removeUser(socket);
  const gameSession = getGameSession();
  gameSession.removeUser(socket);
  errorHandler(socket, new CustomError(500, `소켓오류: ${e.message}`));
};
