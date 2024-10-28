import { HANDLER_IDS } from '../../constants/handlerIds.js';
import { RESPONSE_CODE } from '../../constants/responseCode.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = (socket, userId, payload) => {
  try {
    const { deviceId, playerId, latency } = payload;
    const user = addUser(socket, deviceId, playerId, latency);
    const gameSession = getGameSession();
    gameSession.addUser(user);

    const initialResoinse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_CODE.SUCCESS, {
      userId: deviceId,
    });

    socket.write(initialResoinse);
  } catch (e) {
    console.error(e);
    throw new CustomError(ErrorCodes.SOCKET_ERROR, `게임세션에 유저 추가중 에러`);
  }
};

export default initialHandler;
