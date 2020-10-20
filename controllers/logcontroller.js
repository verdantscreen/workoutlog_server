// need 5 endpts: /log/ (post, get) /log/:id (get, put, delete)
let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let workoutLog = sequelize.import("../models/log");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
