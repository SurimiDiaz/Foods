import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByDiet, getRecipes, resetPage } from "../redux/actions";
import s from "../components/nav.module.css";
const Filters = () => {
  const dispatch = useDispatch();
  const recetas = useSelector((state) => state.recipes);

  const handleChange = (e) => {
    e.preventDefault();
    let value = document.getElementById("selectDiet").value;

    if (value.length) {
      dispatch(resetPage());
      dispatch(getRecipesByDiet(value));

      return;
    } else {
      dispatch(resetPage());
      dispatch(getRecipes());
      return;
    }
  };

  const masSano = () => {
    const recetasOrdenas = recetas.sort((a, b) => {
      return b.healthScore - a.healthScore;
    });
    console.log(recetasOrdenas[0]);

    dispatch(resetPage());
    return dispatch(getRecipesByDiet(null, recetasOrdenas));
  };

  // useEffect(() => {
  //   const masSano = () => {
  //     const recetasOrdenas = recetas.sort((a, b) => {
  //       return b.healthScore - a.healthScore;
  //     });
  //     console.log(recetasOrdenas[0]);

  //     dispatch(resetPage());
  //     return dispatch(getRecipesByDiet(null, recetasOrdenas));
  //   };
  // }, [dispatch, recetas]);
  return (
    <div className={s.conteiner}>
      <form className={s.form}>
        <label>
          <select
            className={s.inputText}
            id="selectDiet"
            onChange={handleChange}
          >
            <option value="">Filter by diet</option>
            <option value="gluten free">gluten free</option>
            <option value="ketogenic">ketogenic</option>
            <option value="vegetarian">vegetarian</option>

            <option value="lacto ovo vegetarian">lacto-ovo-vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="pescetarian">pescetarian</option>
            <option value="paleolithic">paleolithic</option>
            <option value="primal">primal</option>
            <option value="low fodmap">low fodmap</option>
            <option value="whole 30">whole 30</option>
          </select>
        </label>
      </form>
      <button onClick={masSano}>Mas sano</button>
    </div>
  );
};

export default Filters;
