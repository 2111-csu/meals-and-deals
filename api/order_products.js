const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require("./utils");
const client = require('../db/client');
const { JWT_SECRET = 'soSecret' } = process.env;



module.exports = router;