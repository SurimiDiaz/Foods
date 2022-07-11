import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../redux/actions";

import s from "../components/createRecipe.module.css";

const CreateRecipe = () => {
  const [input, setInput] = useState({
    name: "",
    resume: "",
    healthScore: 1,
    diets: [],
    stepByStep: [],
  });
  const [error, setError] = useState({});
  const [step, setStep] = useState({ number: 1, step: "" });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const dietsOfState = useSelector((state) => state.diets);

  // useEffect(() => {
  //   dispatch(getDiets());
  // }, [dispatch]);

  function addStep() {
    setInput({
      ...input,
      stepByStep: [...input.stepByStep, step],
    });
    setStep({
      ...step,
      number: step.number + 1,
      step: "",
    });

    setError(validateInputs({ ...input, stepByStep: [step] }));
  }
  function validateInputs(value) {
    let errors = {};
    // if (/\d/g.test(value.name)) {
    //   errors.name = "💀 No puede contener numeros el nombre 💀";
    // } else if (!value.name) {
    //   errors.name = "💀 La receta debe tener un nombre 💀";
    // }
    // if (value.resume.length < 140) {
    //   errors.resume =
    //     "💀 La receta debe tener un resumen de minimo 140 caracteres 💀";
    // }
    // if (value.healthScore < 1 || value.healthScore > 100) {
    //   errors.healthScore =
    //     "💀 healthScore no debe tener valores fuera del rango de 0 - 100 💀";
    // }
    // // if (value.diets.length < 1) {
    // //   errors.diets = "💀 Debes seleccionar al menos una dieta 💀";
    // // }
    // if (value.stepByStep.length < 1) {
    //   errors.stepByStep = "💀 Debe haber al menos un paso 💀";
    // }
    return errors;
  }

  const handleChange = (e) => {
    if (e.target.name === "diets") {
      if (input.diets.includes(e.target.value)) {
        setInput({
          ...input,
          diets: input.diets.filter((diet) => diet !== e.target.value),
        });
      } else {
        setInput({
          ...input,
          diets: [...input.diets, e.target.value],
        });
      }

      setError(
        validateInputs({
          ...input,
          diets: [e.target.value],
        })
      );
    } else if (e.target.name === "step") {
      setStep({
        ...step,

        step: e.target.value,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });

      setError(
        validateInputs({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (input.diets.length > 0 && !Object.values(error).length) {
    //   dispatch(createRecipe(input));

    //   setMessage("Receta creada con exito");
    // } else {
    //   setMessage(
    //     "Completa los inputs correctamente, revisa que hayas agregado al menos una dieta a la receta"
    //   );
    // }
    dispatch(createRecipe(input));

    setMessage("Receta creada con exito");
  };
  return (
    <div>
      <h1>Create Recipe</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.nameRecipe}>
          <label>Name of recipe </label>
          <input
            className={s.inputText}
            autoComplete="off"
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
            placeholder="Jamon con queso"
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div className={s.summary}>
          <label>Summary</label>
          <textarea
            className={s.inputText}
            autoComplete="off"
            name="resume"
            rows="10"
            cols="50"
            placeholder="Escribe un resumen de tu receta"
            onChange={(e) => handleChange(e)}
          ></textarea>
          {error.resume && <p>{error.resume}</p>}
        </div>
        <div className={s.score}>
          <label>Health Score: {input.healthScore}</label>
          <input
            type="range"
            min={1}
            max={100}
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleChange(e)}
          />
          {error.healthScore && <p>{error.healthScore}</p>}
        </div>

        <div className={s.diets}>
          <h4>Diets</h4>
          {error.diets && <p>{error.diets}</p>}
          {dietsOfState.map((diet) => {
            return (
              <div key={diet.id}>
                <input
                  type="checkbox"
                  name="diets"
                  value={diet.id}
                  onChange={(e) => handleChange(e)}
                />
                <label>{diet.name}</label>
              </div>
            );
          })}
        </div>

        <div className={s.step}>
          <h4>Steps:</h4>
          {error.stepByStep && <p>{error.stepByStep}</p>}
          <ol>
            {input.stepByStep?.map((step) => {
              return <li key={step.number}>{step.step}</li>;
            })}
          </ol>

          <textarea
            className={s.inputText}
            placeholder="Pasos de la receta"
            type="textarea"
            name="step"
            value={step.step}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <input
            className={s.btn}
            type="button"
            value="Add step"
            onClick={addStep}
          />
        </div>

        <input className={s.btnForm} type="submit" value="Send recipe" />
      </form>
      <div id="message">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default CreateRecipe;
