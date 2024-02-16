import Element from "./components/Element/Element.jsx";
import elements from "./data/elements.js";
import "./App.css";

const App = () => {
  return (
    <section className="section-container">
      <div className="periodic-container">
        {elements.map((element, index) => (
          <Element key={index} element={element} />
        ))}
      </div>
    </section>
  );
};

export default App;
