import React from "react";
import imageFoodDefault from "../img/imageFoodDefault.jpg";
import { Link } from "react-router-dom";
import s from "../components/home.module.css";
const CardRecipe = (props) => {
  return (
    <div className={s.card}>
      <div>
        {props.image ? (
          <img className={s.img} src={props.image} alt={props.name} />
        ) : (
          <img className={s.img} src={imageFoodDefault} alt={props.name} />
        )}
      </div>
      <div>
        <Link className={s.link} to={`/recipes/${props.id}`}>
          <h3 className={s.h3}>{props.name}</h3>
        </Link>
        <h3 className={s.h3}>HealthScore: {props.healthScore}</h3>
        <h4>Diets:</h4>
        <ul className={s.ul}>
          {props.diets?.map((diet) => {
            return <li key={diet}>{diet}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardRecipe;
