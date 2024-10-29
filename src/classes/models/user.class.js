class User {
  constructor(socket, id, playerId, latency, x, y) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.latency = latency;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  updatePosision(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
