import { HANDLER_IDS } from '../constants/handlerIds.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    protoType: 'initialPayload.InitialPayload',
  },
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
