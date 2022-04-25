require('dotenv').config()
const {API_KEY} = process.env;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Recipe, TypeDiet } = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    console.log(apiUrl.data)
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
            typeDiets: e.diets.map((d) => {return{name:d}}),
            spoonacularScore: e.spoonacularScore,
            dishTypes: e.dishTypes.map((d) => {return{name:d}}),
            summary: e.summary,
            healthScore: e.healthScore,
            analyzedInstructions: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(s=>s.step).join(""):'')


         
        };
    });
    return apiInfo
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name //busco si hay un query con prop name
    const recipesTotal = await getAllRecipes();

    if (name) {
        let recipeTitle = await recipesTotal.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
        recipeTitle.length ? //si encontraste algo hago lo siguiente:
       
       res.status(200).send(recipeTitle):
       res.status(404).send("la receta no existe")
        

    } else {
        res.status(200).send(recipesTotal)
    }
});

router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipesTotal = await getAllRecipes();
    if (id) {
        let recipeId = await recipesTotal.filter(el => el.id == id);
        recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send('la receta no existe');
    }
});
router.get("/types", async (req, res, next) => {
    var apiDiets = [
      "gluten free",
      "dairy free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "lacto ovo vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];
    try {
      apiDiets.forEach(async (diet) => {
        await TypeDiet.findOrCreate({
          where: {
            name: diet,
          },
        });
      });
      const dbDiets = await TypeDiet.findAll()
      res.status(200).send(dbDiets);
    } catch (error) {
      next(error);
    }
  });

router.post('/recipe', async (req, res) => {
    let {
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
        typeDiets
    } = req.body;

    let createRecipe = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb
    }) 
    let dietTypeDb = await TypeDiet.findAll({
        where: { name: typeDiets}
    })
    createRecipe.addTypeDiet(dietTypeDb)
    res.send('Receta creada con exito!')
})

module.exports = router;




