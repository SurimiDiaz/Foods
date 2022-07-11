"use strict";
const express = require("express");
const router = express.Router();
const {
  getRecipeByName,
  getRecipeById,
  postRecipe,
} = require("./recipe_modules");
module.exports = router;

router.get("/", async (req, res) => {
  try {
    return res.json(await getRecipeByName(req.query));
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:idReceta", async (req, res) => {
  try {
    return res.send(await getRecipeById(req.params));
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = await postRecipe(req.body);
    res.header("TOKEN", "SOY TU AMADO TOKEN");
    return res.json(`Receta creada: ${recipe.dataValues.name}`);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
