import React from "react";
import style from "../components/StartPage.module.css";
import { Link } from "react-router-dom";
import hamburgeusa from "../img/hamburguesa.png";

const StartPage = () => {
  return (
    <div className={style.conteiner}>
      <div className={style.landing}>
        <img src={hamburgeusa} alt="hamburguesa" />

        <h1>Welcome to recipes!</h1>

        <div>
          <Link to="/home">
            <button className={style.btnLandin}>CLICK TO SEE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
