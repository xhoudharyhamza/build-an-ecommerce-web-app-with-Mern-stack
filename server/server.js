let express = require("express");
let app = express();
require("dotenv").config();
require("./database/connection");
let cors = require("cors");
let router = require("./router/routes");
app.use(cors());
app.use(express.json());
app.use(router);
let port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
