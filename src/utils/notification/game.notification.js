import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';

// 해더 붙이기
const serializer = (message, type) => {
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeInt8(type, 0);

  return Buffer.concat([packetLength, packetType, message]);
};

// 화면에 다른유저를 보여줄 패킷 작성
export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.locationUpdate.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish();
  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};

// 핑 패킷
export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return serializer(pingPacket, PACKET_TYPE.PING);
};
