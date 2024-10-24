export const onConnection = (socket) => {
  console.log(`클라이언트 연결 주소 + 임시포트:${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);
};
