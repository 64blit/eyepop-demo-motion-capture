const express = require("express");
const app = express();
const path = require("path");

const port = 3000;
const staticPath = path.join(__dirname, "../");

app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "1_motion_capture.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
