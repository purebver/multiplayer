import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProto.js';
import CustomError from '../error/customError.js';
import { ErrorCodes } from '../error/errorCodes.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조 디코드
  const Packet = protoMessages.common.CommonPacket;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (e) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코드 에러');
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const version = packet.version;

  if (version !== CLIENT_VERSION) {
    throw new CustomError(
      ErrorCodes.CLIENT_VERSION_MISMATCH,
      '클라이언트 버전이 일치하지 않습니다',
    );
  }

  //핸들러 아이디에 따른 페이로드 타입
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.PROTO_ERROR, '핸들러에 따른 프로토가 명시되어있지 않습니다.');
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];

  let payload;
  try {
    payload = payloadType.decode(packet.payload);
  } catch (e) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코드 에러');
  }

  // 중복검증
  // const errorMessage = payloadType.verify(payload);
  // if (errorMessage) {
  //   throw new CustomError(
  //     ErrorCodes.INVALID_PACKET,
  //     `패킷 구조가 일치하지 않습니다 ${errorMessage}`,
  //   );
  // }

  //payload가 가지고 있어야할 필드들
  const expoctetFields = Object.keys(payloadType.fields);

  //현재 payload필드
  const actualFields = Object.keys(payload);

  //없는 필드 확인
  const missingFields = expoctetFields.filter((field) => !actualFields.includes(field));

  if (missingFields.length > 0) {
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `필수 필드가 누락 ${missingFields.join(', ')}`,
    );
  }

  // console.log('------------------------------------------', handlerId, userId, version, payload);

  return { handlerId, userId, version, payload };
};
