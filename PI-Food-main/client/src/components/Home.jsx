import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../redux/actions";
import CardRecipe from "../components/CardRecipe";
import Paginado from "../components/Paginado";
import Nav from "../components/Nav";
import s from "../components/home.module.css";

class Home extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  componentDidUpdate(prevProps) {
    if (this.props.recipes !== prevProps.recipes) {
      console.log("xxx");
    }
  }
  render() {
    const recipesInPage = 9;
    const pagination = (this.props.pagina - 1) * recipesInPage;

    return (
      <div>
        {<Nav />}
        <div className={s.father}>
          <h1>{this.props.recipes.length} Recipes!</h1>
          {<Paginado />}

          <ul className={s.conteiner}>
            {this.props.recipes
              ?.slice(pagination, pagination + recipesInPage)
              .map((recipe) => {
                return (
                  <li key={recipe.id}>
                    <CardRecipe
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      diets={recipe.diets}
                      healthScore={recipe.healthScore}
                    />
                  </li>
                );
              })}
          </ul>
          {this.props.recipes.length === 0 && <h3>No recipes!</h3>}
        </div>
      </div>
    );
  }
}
export const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    pagina: state.pagina,
  };
};

export default connect(mapStateToProps, { getRecipes })(Home);
