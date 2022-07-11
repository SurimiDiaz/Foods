import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, beforePage } from "../redux/actions";
import s from "../components/home.module.css";

const Paginado = () => {
  const pagina = useSelector((state) => state.pagina);
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const recipesInPage = 9;

  const maximo = Math.ceil(recipes.length / recipesInPage);

  return (
    <div>
      <button
        className={s.btn}
        onClick={(e) => {
          e.preventDefault();
          pagina > 1 && dispatch(beforePage(1));
        }}
      >
        back
      </button>
      <label className={s.text}>pag {pagina}</label>

      <button
        className={s.btn}
        onClick={(e) => {
          e.preventDefault();

          pagina < maximo && dispatch(nextPage(1));
        }}
      >
        next
      </button>
      <label className={s.text}>Of {maximo}</label>
    </div>
  );
};

export default Paginado;
