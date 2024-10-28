import { getGameSession } from '../../session/game.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { errorHandler } from '../../utils/error/errorHandler.js';

const locationUpdateHandler = (socket, userId, payload) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임을 찾지 못했습니다.');
    }

    console.log(gameSession);

    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾지 못했습니다.');
    }

    user.updatePosision(x, y);

    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);
  } catch (e) {
    errorHandler(socket, e);
  }
};

export default locationUpdateHandler;
