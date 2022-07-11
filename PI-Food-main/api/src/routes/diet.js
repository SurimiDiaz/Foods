"use strict";
const express = require("express");
const router = express.Router();
const { showDiets } = require("./diet_module");

router.get("/", async (req, res) => {
  try {
    return res.json(await showDiets());
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
module.exports = router;
