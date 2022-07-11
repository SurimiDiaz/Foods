import React from "react";
import { useDispatch } from "react-redux";
import { resetPage } from "../redux/actions";
import { Link } from "react-router-dom";

import s from "../components/homeButton.module.css";
const HomeButton = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.conteiner}>
      <div className={s.subCointeiner}>
        <Link to="/home">
          <button className={s.btnSec} onClick={() => dispatch(resetPage())}>
            Vamos a home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeButton;
