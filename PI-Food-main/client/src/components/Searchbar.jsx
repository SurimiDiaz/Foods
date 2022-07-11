import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes, resetPage, getRecipes } from "../redux/actions";
import s from "../components/nav.module.css";
const Searchbar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPage());
    dispatch(searchRecipes(name));
  };

  const cleanSearch = (e) => {
    e.preventDefault();
    dispatch(resetPage());
    dispatch(getRecipes());

    setName("");
  };
  return (
    <div>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Search recipe: </label>
        <input
          className={s.inputText}
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          placeholder="Search recipe by name"
          onChange={(e) => handleChange(e)}
        />
        <button className={s.btn} type="submit">
          Find
        </button>
        <button className={s.btn} onClick={(e) => cleanSearch(e)}>
          Clean
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
