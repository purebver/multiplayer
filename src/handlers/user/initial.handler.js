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
    const { deviceId, playerId, latency } = payload;

    //유저의 deviceId가 db에 있는지 확인 없으면 생성후 추가
    let userData = await findUserByDeviceId(deviceId);

    if (!userData) {
      await createUser(deviceId);
      userData = await findUserByDeviceId(deviceId);
    }

    const user = addUser(socket, deviceId, playerId, latency, userData.last_x, userData.last_y);

    //게임세션에 유저 추가
    const gameSession = getGameSession();
    gameSession.addUser(user);

    //클라이언트에 초기 좌표를 전달
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
