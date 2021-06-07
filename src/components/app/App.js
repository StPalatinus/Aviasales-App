import "./App.scss";
import React from "react";
import mainLogo, { ReactComponent as Logo } from "../../img/mainlogo.svg";

const logo = require("../../img/mainlogo.svg");

function App() {
  console.log("import:");
  console.log(mainLogo);
  console.log("require");
  console.log(logo);
  console.log(logo.default);
  return (
    <section className="App">
      <header>
        <img className="header--logo" srs={mainLogo} alt="mainlogo" />
        <img className="header--logo" srs={logo} alt="logo" />
        <img src={`${process.env.PUBLIC_URL}/mainlogo.svg`} alt="logo" />
        <Logo />
      </header>
      <aside>_ASIDE_</aside>
      <main>_BODY_</main>
      <footer>_FOOTER_</footer>
    </section>
  );
}

export default App;
