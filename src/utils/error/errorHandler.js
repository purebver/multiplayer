import { createResponse } from '../response/createResponse.js';
import { ErrorCodes } from './errorCodes.js';

export const errorHandler = (socket, error) => {
  let responseCode;
  let message;
  console.error(error);

  // customError로 작성 시 에러코드를 가지고 있음
  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러코드: ${responseCode}, 메세지: ${message}`);
  } else {
    // 그 외에는 예상치 못한 오류 => 소켓오류
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`일반에러: ${message}`);
  }

  const errorResponse = createResponse(-1, responseCode, { message });
  socket.write(errorResponse);
};
