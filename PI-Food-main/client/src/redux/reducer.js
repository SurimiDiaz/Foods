import {
  GET_RECIPES,
  GET_RECIPES_By_DIET,
  GET_RECIPE_DETAIL,
  NEXT_PAGE,
  BEFORE_PAGE,
  RESET_PAGE,
  SEARCH_RECIPE,
  ORDER,
  GET_DIETS,
  CREATE_RECIPE,
} from "../redux/actions";

const initialState = {
  recipes: [],
  newRecipe: {},
  recipeDetail: {},
  pagina: 1,
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        newRecipe: action.payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_RECIPES_By_DIET:
      return {
        ...state,
        recipes: action.payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        pagina: state.pagina + action.payload,
      };

    case BEFORE_PAGE:
      return {
        ...state,
        pagina: state.pagina - action.payload,
      };

    case RESET_PAGE:
      return {
        ...state,
        pagina: 1,
      };

    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case ORDER:
      return {
        ...state,

        recipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
