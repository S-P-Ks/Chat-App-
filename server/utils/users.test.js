const expect = require("expect");
const users = require("./users");
const { Users } = require("./users");

describe("Users", () => {
  beforeEach(() => {
    us = new Users();
    us.users = [
      {
        id: "1",
        name: "s_p_k",
        room: "React js",
      },
      {
        id: "2",
        name: "Shubham",
        room: "React js",
      },
      {
        id: "3",
        name: "Kumbhare",
        room: "Vue js",
      },
    ];
    console.log(us.getUsersList("React js"));
  });

  it("should add new user", () => {
    var u = new Users();
    let user = {
      id: "afafadf",
      name: "s_p_k",
      room: "Node JS",
    };

    let reuser = u.addUser(user.id, user.name, user.room);
    console.log(u.users);
    console.log(user);
    expect(u.users).toEqual([user]);
  });

  it("should return names of the React js", () => {
    let nameArr = us.getUsersList("React js");

    expect(nameArr).toEqual(["s_p_k", "Shubham"]);
  });

  it("should return names for the vue js", () => {
    let nameArr = us.getUsersList("Vue js");

    expect(nameArr).toEqual(["Kumbhare"]);
  });

  it("should find user", () => {
    let userId = 2;
    let user = us.getUser(userId);

    expect(us.id).toBe(userId);
  });

  it("should not find the user", () => {
    let userId = 150;
    let user = us.getUser(userId);

    expect(us.id).toBeUndefined();
  });

  it("should not remove a user", () => {
    let userId = 108;
    let user = us.removeUser(userId);

    expect(user.id).toBeUndefined();
    expect(users.users.length).toBe(2);
  });

  it("should remove a user", () => {
    let userId = 1;
    let user = us.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
});
