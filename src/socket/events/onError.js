import CustomError from '../../utils/error/customError.js';

export const onError = (socket) => (e) => {
  throw new CustomError(socket, e);
};
