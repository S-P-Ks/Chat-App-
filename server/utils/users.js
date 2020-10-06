class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {
      id,
      name,
      room,
    };
    return this.users.push(user);
  }

  getUsersList = (room) => {
    let us = this.users.filter((user) => user.room === room);
    let namesArr = us.map((user) => user.name);

    return namesArr;
  };

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id) {
    let user = this.getUser(id);
    if (user) {
      return (this.users = this.users.filter((user) => user.id !== id));
    }
  }
}

module.exports = { Users };
