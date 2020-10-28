require("dotenv").config();

let express = require("express");
let app = express();
let user = require("./controllers/usercontroller");
let log = require("./controllers/logcontroller");
let sequelize = require("./db");

sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user);
app.use(require("./middleware/validate-session"));

app.use("/log", log);

app.listen(3001, function () {
  console.log("great, listening on 3001");
});

// app.use("/api/test", function (req, res) {
//   res.send("data from /api/test endpoint from server");
// });
