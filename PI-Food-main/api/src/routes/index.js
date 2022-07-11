const { Router } = require("express");
const recipe = require("./recipe");
const diet = require("./diet");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipe);
router.use("/diets", diet);
module.exports = router;
