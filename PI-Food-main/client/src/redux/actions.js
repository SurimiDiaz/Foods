import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_By_DIET = "GET_RECIPES_By_DIET";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS = "GET_DIETS";

export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const NEXT_PAGE = "NEXT_PAGE";
export const BEFORE_PAGE = "BEFORE_PAGE";
export const RESET_PAGE = "RESET_PAGE";

export const ORDER = "ORDER";

export const getRecipes = () => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes`)
      .then((res) =>
        dispatch({
          type: GET_RECIPES,
          payload: res.data,
        })
      )
      .catch((err) => console.error(err.response.data));
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((res) =>
        dispatch({
          type: GET_RECIPE_DETAIL,
          payload: res.data,
        })
      )
      .catch((err) => console.error(err.response.data));
  };
};

export const searchRecipes = (name) => {
  return async function (dispatch) {
    return (
      axios
        .get(`http://localhost:3001/recipes?name=${name}`)
        .then((res) =>
          dispatch({
            type: SEARCH_RECIPE,
            payload: res.data,
          })
        )
        .catch((err) => console.error(err.response.data)),
      dispatch({
        type: GET_RECIPES_By_DIET,
        payload: [],
      })
    );
  };
};

export const getRecipesByDiet = (diet, masSano) => {
  if (masSano) {
    return {
      type: GET_RECIPES_By_DIET,
      payload: masSano,
    };
  }
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes?diets=${diet}`)
      .then((res) =>
        dispatch({
          type: GET_RECIPES_By_DIET,
          payload: res.data,
        })
      )
      .catch(
        (err) => console.error(err.response.data),
        dispatch({
          type: GET_RECIPES_By_DIET,
          payload: [],
        })
      );
  };
};

export const createRecipe = (input) => {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/recipes", {
        diets: input.diets,
        name: input.name,
        resume: input.resume,
        healthScore: input.healthScore,
        stepByStep: input.stepByStep,
      })
      .then((res) =>
        dispatch(
          {
            type: CREATE_RECIPE,
            payload: res.data,
          },
          console.log("toke?", res)
        )
      )
      .catch((err) => console.error(err.response.data));
  };
};
export const nextPage = (value) => {
  return {
    type: NEXT_PAGE,
    payload: value,
  };
};

export const beforePage = (value) => {
  return {
    type: BEFORE_PAGE,
    payload: value,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};

export const order = (callback) => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes`)
      .then((res) =>
        dispatch({
          type: ORDER,
          payload: res.data.sort(callback),
        })
      )
      .catch((err) => console.error(err.response.data));
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/diets`)
      .then((res) =>
        dispatch({
          type: GET_DIETS,
          payload: res.data,
        })
      )
      .catch((err) => console.error(err.response.data));
  };
};
