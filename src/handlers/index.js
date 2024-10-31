import { HANDLER_IDS } from '../constants/handlerIds.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import pingpongHandler from './game/pingpong.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initialPayload.InitialPayload',
  },
  [HANDLER_IDS.PING]: {
    handler: pingpongHandler,
    protoType: 'common.Ping',
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: 'locationUpdatePayload.LocationUpdatePayload',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다, 핸들러ID:${handlerId}`,
    );
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다, 핸들러ID:${handlerId}`,
    );
  }

  return handlers[handlerId].protoType;
};
