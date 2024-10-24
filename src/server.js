import net from 'net';
import dotenv from 'dotenv';
import { onConnection } from './socket/onConnection.js';

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = net.createServer(onConnection);

server.listen(PORT, HOST, () => {
  console.log(`서버 온 ${server.address().family}-${HOST}:${PORT}`);
});
