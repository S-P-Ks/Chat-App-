const moment = require("moment");

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

let generateLocationMessage = (from, lat, lag) => {
  return {
    from,
    url: `https://google.com/maps/?=${lat},${lag}`,
    createdAt: moment().valueOf(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
