const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "workoutlogAssignment",
  "postgres",
  "pyth0n2o2o",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to wola postgres db");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
