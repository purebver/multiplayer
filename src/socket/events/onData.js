import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import pingpongHandler from '../../handlers/game/pingpong.js';
import { getHandlerById } from '../../handlers/index.js';
import { errorHandler } from '../../utils/error/errorHandler.js';
import { packetParser } from '../../utils/parser/packetParser.js';

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  //헤더 길이(4 + 1)
  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  //받은 버퍼가 헤더길이보다 크면
  while (socket.buffer.length >= totalHeaderLength) {
    //패킷 전체 길이(4바이트 = 32비트)
    const length = socket.buffer.readUInt32BE(0);

    //패킷 타입(4바이트 이후 1바이트)
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    //버퍼 길이가 패킷 전체 길이보다 크거나 같으면 데이터를 다 받은 것
    if (socket.buffer.length >= length) {
      // 패킷에서 헤더 제외하고 내용만 뽑아오기
      const packet = socket.buffer.subarray(totalHeaderLength, length);

      // 버퍼에 내용이 더 들어왔을 가능성이 있으므로 사용될 내용 이후 버퍼값을 저장
      socket.buffer = socket.buffer.subarray(length);

      // console.log(`패킷 길이: ${length}, 패킷 타입: ${packetType}`);
      // console.log(`패킷: `, packet);

      // 있는거 활용 하려다 보니 의미 없는 모양의 switch
      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);

            handler(socket, userId, payload);
            break;
          case PACKET_TYPE.NORMAL: {
            const { handlerId, userId, payload } = packetParser(packet);
            // console.log('패킷파싱:-----------------------', handlerId, userId, payload);
            const handler = getHandlerById(handlerId);

            handler(socket, userId, payload);
          }
        }
      } catch (e) {
        errorHandler(socket, e);
      }
    }
  }
};
