import { onData } from './events/onData.js';
import { onEnd } from './events/onEnd.js';
import { onError } from './events/onError.js';

export const onConnection = (socket) => {
  console.log(`클라이언트 연결 주소:${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};
