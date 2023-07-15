const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

const PORT = process.env.PORT || 3000;
console.log("frontend-server started on port:", PORT);
app.listen(PORT);
