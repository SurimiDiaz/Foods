import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../redux/actions";

import imageFoodDefault from "../img/imageFoodDefault.jpg";
import s from "../components/recipeDetail.module.css";

const RecipeDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detailRecipe = useSelector((state) => state.recipeDetail);
  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch, id]);

  return (
    <div className={s.conteiner}>
      <div className={s.recipe}>
        <div className={s.imgConteiner}>
          {detailRecipe.img ? (
            <img
              className={s.img}
              src={detailRecipe.img}
              alt={detailRecipe.name}
            />
          ) : (
            <img className={s.img} src={imageFoodDefault} alt={props.name} />
          )}
        </div>

        <div className={s.tituloPlato}>
          <h1 className={s.h1}>{detailRecipe.name}</h1>

          <h3>Dish Types:</h3>
          <ul className={s.ul}>
            {detailRecipe.dishTypes?.map((dish) => {
              return <li key={dish}>{dish}</li>;
            })}
          </ul>
        </div>
        <div className={s.diets}>
          <h3>Diets:</h3>
          <ul className={s.ul}>
            {detailRecipe.diets?.map((diet) => {
              return <li key={diet}>{diet}</li>;
            })}
          </ul>
        </div>

        <div className={s.summary}>
          <h4>Summary:</h4>
          <p className={s.p}>{detailRecipe.resume}</p>
        </div>
        <div className={s.step}>
          <h4>Health Score: {detailRecipe.healthScore}</h4>
          <h4>Step by step:</h4>
          <ol>
            {detailRecipe.stepByStep?.map((step) => {
              return <li key={step.number}>{step.step}</li>;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
