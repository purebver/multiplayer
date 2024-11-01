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

    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾지 못했습니다.');
    }

    //클라이언트에서 받은 xy좌표를 유저 좌표에 전달
    user.updatePosision(x, y);

    //현 소켓 유저를 제외한 다른 유저들의 데이터를 가져와 클라이언트에 보냄으로 화면에 표시
    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);
  } catch (e) {
    errorHandler(socket, e);
  }
};

export default locationUpdateHandler;
