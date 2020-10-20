require("dotenv").config();

let express = require("express");
let app = express();
let user = require("./controllers/usercontroller");
let sequelize = require("./db");

sequelize.sync();

app.use(express.json());

app.use(require("./middleware/headers"));

app.use("/api/user", user);

app.listen(3000, function () {
  console.log("great, just great");
});

// app.use("/api/test", function (req, res) {
//   res.send("data from /api/test endpoint from server");
// });
