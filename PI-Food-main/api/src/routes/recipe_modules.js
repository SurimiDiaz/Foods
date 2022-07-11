const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { apiKey } = require("../db");

module.exports = {
  getRecipeByName: async function (query) {
    const allRepices = [];

    let apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`
    );

    apiRecipes.data.results.map((receta) => {
      allRepices.push({
        id: receta.id,
        image: receta.image,
        name: receta.title,
        diets: receta.diets,
        resume: receta.summary,
        healthScore: receta.healthScore,
        stepByStep: receta.analyzedInstructions[0]?.steps,
      });
    });

    const findRecipes = [];
    const recipesFromDb = await Recipe.findAll({ include: Diet });

    if (recipesFromDb.length > 0) {
      recipesFromDb.map((e) => {
        allRepices.push({
          id: e.dataValues.id,
          name: e.dataValues.name,
          resume: e.dataValues.resume,
          healthScore: e.dataValues.healthScore,
          stepByStep: e.dataValues.stepByStep,
          diets: e.dataValues.diets.map((e) => {
            return e.name;
          }),
        });
      });
    }

    const finder = (type) => {
      allRepices.map((e) => {
        if (Array.isArray(e[type])) {
          e[type].includes(query[type].toLowerCase())
            ? findRecipes.push(e)
            : null;
        } else {
          e[type].toLowerCase().includes(query[type].toLowerCase())
            ? findRecipes.push(e)
            : null;
        }
      });
      if (findRecipes.length === 0)
        throw new Error(`No recipe found whit ${query[type]}`);
      return findRecipes;
    };

    if (query.name) {
      return finder("name");
    } else if (query.diets) {
      return finder("diets");
    }

    return allRepices;
  },

  getRecipeById: async (id) => {
    if (id.idReceta.includes("-")) {
      const dbRecipe = await Recipe.findByPk(id.idReceta, {
        include: Diet,
      });

      return {
        id: dbRecipe.id,
        name: dbRecipe.name,
        resume: dbRecipe.resume,
        healthScore: dbRecipe.healthScore,
        stepByStep: dbRecipe.stepByStep,
        diets: dbRecipe.diets?.map((diet) => {
          return diet.name;
        }),
      };
    }

    const recipeById = await axios.get(
      `https://api.spoonacular.com/recipes/${id.idReceta}/information?apiKey=${apiKey}`
    );

    const { data } = recipeById;

    return {
      img: data.image,
      name: data.title,
      dishTypes: data.dishTypes,
      diets: data.diets,
      resume: data.summary,
      healthScore: data.healthScore,
      stepByStep: data.analyzedInstructions[0]?.steps,
    };
  },
  postRecipe: async (body) => {
    const { diets } = body;
    const recipe = await Recipe.create(body);

    const PENDING_PROMISES_ARRAY = diets.map((diet) => {
      recipe.addDiet(diet);
    });
    await Promise.all(PENDING_PROMISES_ARRAY);

    return recipe;
  },
};
