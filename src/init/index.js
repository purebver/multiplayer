import { loadProtos } from './loadProto.js';

export const initServer = async () => {
  try {
    await loadProtos();
  } catch (e) {
    console.error(e);
  }
};
