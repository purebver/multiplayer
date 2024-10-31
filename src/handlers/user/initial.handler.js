import { HANDLER_IDS } from '../../constants/handlerIds.js';
import { RESPONSE_CODE } from '../../constants/responseCode.js';
import { createUser, findUserByDeviceId } from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = async (socket, userId, payload) => {
  try {
    console.log(payload);
    const { deviceId, playerId, latency } = payload;

    let userData = await findUserByDeviceId(deviceId);

    if (!userData) {
      await createUser(deviceId);
      userData = await findUserByDeviceId(deviceId);
    }

    console.log(latency);

    const user = addUser(socket, deviceId, playerId, latency, userData.last_x, userData.last_y);

    const gameSession = getGameSession();
    gameSession.addUser(user);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_CODE.SUCCESS, {
      userId: deviceId,
      x: userData.last_x,
      y: userData.last_y,
    });

    socket.write(initialResponse);
  } catch (e) {
    console.error(e);
    throw new CustomError(ErrorCodes.SOCKET_ERROR, `게임세션에 유저 추가중 에러`);
  }
};

export default initialHandler;
