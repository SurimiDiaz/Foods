const { Diet } = require("../db");

module.exports = {
  getDiets: async () => {
    const dbDiet = await Diet.findAll();

    if (dbDiet.length !== 0) {
      return {};
    }
    const diets = [
      { name: "gluten free" },
      { name: "ketogenic" },
      { name: "vegetarian" },

      { name: "lacto-ovo-vegetarian" },
      { name: "vegan" },
      { name: "pescetarian" },
      { name: "paleolithic" },
      { name: "primal" },
      { name: "low fodmap" },
      { name: "whole 30" },
    ];

    await Diet.bulkCreate(diets);
  },

  showDiets: async () => {
    const dbDiet = await Diet.findAll();
    return dbDiet;
  },
};
