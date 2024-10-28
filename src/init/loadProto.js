import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetName.js';
import _ from 'lodash';

//현재 파일 주소
const __filename = fileURLToPath(import.meta.url);

//현재 파일의 폴더 주소
const __dirname = path.dirname(__filename);

//프로토버프 주소
const protoDir = path.join(__dirname, '../protobuf');

//프로토 파일 불러오기
const getAllProtoFiles = (dir, fileList = []) => {
  //폴더내 모든파일 배열로 저장
  const files = fs.readdirSync(dir);

  //배열 순회
  files.forEach((file) => {
    //현재 순회중인 파일의 경로
    const filePath = path.join(dir, file);

    //파일이 폴더면
    if (fs.statSync(filePath).isDirectory()) {
      //그폴더에서 함수 재실행
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      //프로토 파일이면 리스트에 추가
      fileList.push(filePath);
    }
  });
  return fileList;
};

//함수 실행하여 변수에 저장
const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    //파일로드
    await Promise.all(protoFiles.map((file) => root.load(file)));

    //packetNames에서 명시된 이름 가져오기
    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        //lookupType으로 프로토파일에서 정의된 메시지 형태를 가지고오기
        protoMessages[packetName][type] = root.lookupType(typeName);
      }
    }

    console.log('protobuf 파일이 로드되었습니다.');
  } catch (e) {
    console.error('protobuf 파일 로드 중 오류가 발생: ', e);
  }
};

export const getProtoMessages = () => {
  return _.cloneDeep(protoMessages);
};
