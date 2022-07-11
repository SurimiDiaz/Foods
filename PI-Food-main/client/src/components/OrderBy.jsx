import React from "react";
import { useDispatch } from "react-redux";
import { order, getRecipes, resetPage } from "../redux/actions";
import s from "../components/nav.module.css";
const OrderBy = () => {
  const dispatch = useDispatch();

  const handleChange = () => {
    let value = document.getElementById("orderBy").value;

    if (value === "healthScore") {
      dispatch(resetPage());
      dispatch(
        order((a, b) => {
          return b.healthScore - a.healthScore;
        })
      );

      return;
    }
    if (value === "healthScoreD") {
      dispatch(resetPage());
      dispatch(
        order((a, b) => {
          return a.healthScore - b.healthScore;
        })
      );

      return;
    }

    if (value === "name") {
      dispatch(resetPage());
      dispatch(
        order((a, b) => {
          if (a[value] > b[value]) {
            return 1;
          }
          if (a[value] < b[value]) {
            return -1;
          }
          return 0;
        })
      );
      return;
    }

    if (value === "nameD") {
      dispatch(resetPage());
      dispatch(
        order((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      );
      return;
    }

    dispatch(resetPage());
    dispatch(getRecipes());
  };
  return (
    <div className={s.conteiner}>
      <form className={s.form}>
        <label>
          <select className={s.inputText} id="orderBy" onChange={handleChange}>
            <option value="" defaultValue>
              Order By
            </option>
            <option value="name">Name recipe (up)</option>
            <option value="nameD">Name recipe (down)</option>
            <option value="healthScore">Healthscore (healthier)</option>
            <option value="healthScoreD">Healthscore (less healthy)</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default OrderBy;
