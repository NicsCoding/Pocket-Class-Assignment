const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
// require('cors');
// from("dotenv").config();
const router = require("./router/router");
server.use(express.json());
server.use("/instructor", router.router);
server.listen(1729, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
