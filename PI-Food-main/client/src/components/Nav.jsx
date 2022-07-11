import React from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filters";
import Searchbar from "../components/Searchbar";
import OrderBy from "../components/OrderBy";
import s from "../components/nav.module.css";

const Nav = () => {
  return (
    <div className={s.conteiner}>
      <nav className={s.nav}>
        <ul className={s.ul}>
          <li>
            <Link className={s.link} to="/createRecipe">
              Create Recipe
            </Link>
          </li>
        </ul>
        <Searchbar /> <Filter />
        <OrderBy />
      </nav>
    </div>
  );
};

export default Nav;
