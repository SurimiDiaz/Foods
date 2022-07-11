import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StartPage from "./components/StartPage";
import HomeButton from "./components/HomeButton";
import RecipeDetail from "./components/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  return (
    <div className="App">
      <HomeButton />

      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
      </Routes>
      <div className="Footer">
        <h3>Hecho con 💚 por Laura Surimi</h3>
      </div>
    </div>
  );
}

export default App;
