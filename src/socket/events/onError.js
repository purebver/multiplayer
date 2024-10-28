import CustomError from '../../utils/error/customError.js';
import { errorHandler } from '../../utils/error/errorHandler.js';

export const onError = (socket) => (e) => {
  errorHandler(socket, new CustomError(500, `소켓오류: ${e.message}`));
};
