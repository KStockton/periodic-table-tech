import Element from "./components/Element/ElementItem.jsx";
import styled, { keyframes } from "styled-components";
import elements from "./data/elements.js";
import "./App.css";
import flask from "./assets/chemistry.gif";
import heat from "./assets/heat.gif";
import { useState } from "react";

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
`;

const PeriodicContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 0.5rem;
  animation: ${fadeUp} 1s;
`;

const App = () => {
  const [product, setProduct] = useState();

  const handleDragOver = (e) => {
    e.preventDefault();

    e.target.closest(".reactant").style.background = "rgba(0, 0, 0, 0.2)";
    return false;
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.target.closest(".reactant").style.borderStyle = "dotted";
  };

  const handleDragLeave = (e) => {
    e.target.closest(".reactant").style.borderStyle = "solid";
    e.target.closest(".reactant").style.backgroundColor = "inherit";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/html");
    const dropLocation = e.target.closest(".reactant");

    if (dropLocation) {
      dropLocation.innerHTML = draggedItem;
    }

    const techInfo = e.dataTransfer.getData("text/plain");

    setProduct(techInfo);
  };

  return (
    <section className="section-container">
      <div className="header-container">
        <div className="reaction-wrapper">
          <header>
            <h2>Reactants</h2>
          </header>
          <article className="reaction-container">
            <img src={flask} alt="erlenmeyer flask" width={65} height={65} />
            <p className="operators">&#43;</p>
            <div
              className="reactant"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
            ></div>
            <p className="operators">&#43;</p>
            <img src={heat} alt="erlenmeyer flask" width={65} height={65} />
            <p className="operators">&#61;</p>
          </article>
        </div>
        <div className="product-wrapper">
          <header>
            <h2>Product</h2>
          </header>
          <article className="reactant result">
            <h3>{product}</h3>
          </article>
        </div>
      </div>
      <PeriodicContainer className="periodic-container">
        {elements.map((element, index) => (
          <Element key={index} element={element} />
        ))}
      </PeriodicContainer>

    </section>
  );
};

export default App;
