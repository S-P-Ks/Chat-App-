const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "WDJ",
      text = "Good Bro ...",
      message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate Location", () => {
  it("should generate correct location", () => {
    let from = "Claire",
      lat = 15,
      lag = 56;
    let url = `https://google.com/maps/?=${lat},${lag}`;
    let message = generateLocationMessage(from, lat, lag);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
