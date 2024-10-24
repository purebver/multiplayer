import net from 'net';
import { onConnection } from './socket/onConnection.js';
import { HOST, PORT } from './constants/env.js';

const server = net.createServer(onConnection);

server.listen(PORT, HOST, () => {
  console.log(`서버 온 ${server.address().family}-${HOST}:${PORT}`);
});
