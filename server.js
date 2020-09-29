const path = require("path");
const public = path.join(__dirname, "/public");
const express = require("express");

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(public));
app.listen(3000, () => {
  console.log("Logging into the server on port 3000");
});
