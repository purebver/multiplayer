import net from 'net';
import { onConnection } from './socket/onConnection.js';
import { HOST, PORT } from './constants/env.js';
import { initServer } from './init/index.js';

const server = net.createServer(onConnection);

async function init() {
  try {
    await initServer();
    server.listen(PORT, HOST, () => {
      console.log(`서버 온 ${server.address().family}-${HOST}:${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

init();
