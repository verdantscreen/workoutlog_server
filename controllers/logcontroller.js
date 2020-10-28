let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let logModel = sequelize.import("../models/log");

router.post("/", function (req, res) {
  console.log("testing");
  let owner = req.user.id;
  let description = req.body.logdata.description;
  let definition = req.body.logdata.definition;
  let result = req.body.logdata.result;
  // let logdata = req.body.logdata; unneeded

  logModel
    .create({
      description: description,
      definition: definition,
      result: result,
      owner_id: owner /* kv : var*/,
    })
    .then(
      function createSuccess(logdata) {
        res.json({
          logdata: logdata,
        });
      },
      function createError(err) {
        console.log("hello");
        res.send(500, err.message);
      }
    );
});

router.get("/", function (req, res) {
  let userid = req.user.id;

  logModel
    .findAll({
      where: { owner_id: userid },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

router.get("/:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;

  logModel
    .findOne({
      where: { id: data, owner_id: userid },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
      }
    );
});

router.put("/:id", function (req, res) {
  let description = req.body.logdata.description;
  let definition = req.body.logdata.definition;
  let result = req.body.logdata.result;
  let data = req.params.id;
  let logdata = req.body.logdata;
  let userid = req.user.id;

  logModel
    .update(
      {
        description: description,
        definition: definition,
        result: result,
        owner_id: userid /* ? */,
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedLog) {
        /* ? */
        res.json({
          logdata: logdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
      }
    );
});

router.delete("/:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;

  logModel
    .destroy({
      where: { id: data, owner_id: userid },
    })
    .then(
      function deleteLogSuccess(data) {
        res.send("Log deleted successfully");
      },
      function deleteLogError(err) {
        res.send(500, err.message);
      }
    );
});

module.exports = router;
