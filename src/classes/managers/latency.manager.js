import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

class LatencyManager {
  constructor() {
    this.intervals = new Map();
  }

  addUser(userId, callback, timestamp) {
    if (this.intervals.has(userId)) {
      throw new CustomError(ErrorCodes.SOCKET_ERROR, `이미 게임에 유저가 존재합니다: ${userId}`);
    }
    this.intervals.set(userId, setInterval(callback, timestamp));
  }

  removeUser(userId) {
    if (!this.intervals.has(userId)) {
      return;
    }
    clearInterval(this.intervals.get(userId));
    this.intervals.delete(userId);
  }

  clearAll() {
    this.intervals.forEach((userIntervals) => {
      clearInterval(userIntervals);
    });
    this.intervals.clear;
  }
}

export default LatencyManager;
