import { createLocationPacket } from '../../utils/notification/game.notification.js';
import LatencyManager from '../managers/latency.manager.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.latencyManager = new LatencyManager();
  }

  addUser(user) {
    this.users.push(user);

    this.latencyManager.addUser(user.id, user.ping.bind(user), 1000);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  getUserSocket(socket) {
    return this.users.find((user) => user.socket === socket);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      this.latencyManager.removeUser(this.users[index].id);
      if (this.users.length === 1) {
        this.latencyManager.clearAll();
      }
      return this.users.splice(index, 1)[0];
    }
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency;
  }

  getAllLocation(userId) {
    const maxLatency = this.getMaxLatency();
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.calculatePosition(maxLatency);
        return { id: user.id, playerId: user.playerId, x, y };
      });

    // console.log(locationData);

    return createLocationPacket(locationData);
  }
}

export default Game;
