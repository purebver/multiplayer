import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { RESPONSE_CODE } from '../../constants/responseCode.js';
import { getProtoMessages } from '../../init/loadProto.js';

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

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.locationUpdate.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish();
  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};
