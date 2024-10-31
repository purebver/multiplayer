import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const createResponse = (handlerId, responseCode, data = null) => {
  const protoMessages = getProtoMessages();

  const dataModel = protoMessages.lastPosition.LastPosition;

  let datapacket;

  //현재 createResponse에서 보내주는 handlerId는 에러'-1' 을 제외하면 lastPosition.LastPosition이 끝
  if (handlerId === -1) {
    datapacket = data ? Buffer.from(JSON.stringify(data)) : null;
  } else {
    datapacket = dataModel.encode(data).finish();
  }

  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: datapacket,
  };

  const buffer = Response.encode(responsePayload).finish();

  const packetLength = Buffer.alloc(config.packet.totalLength);

  packetLength.writeUInt32BE(
    buffer.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUint8(PACKET_TYPE.NORMAL, 0);

  return Buffer.concat([packetLength, packetType, buffer]);
};
