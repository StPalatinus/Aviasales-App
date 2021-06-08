import React from "react";
import appStyles from "./App.module.scss";
import mainLogo from "../../img/mainlogo.svg";

function App() {
  App.dafeultProps = {};

  return (
    <section className={appStyles.App}>
      <header className={appStyles.header}>
        <img className={appStyles["header-logo"]} src={mainLogo} alt="tst" />
      </header>
      <aside>_ASIDE_</aside>
      <main>_BODY_</main>
      <footer>_FOOTER_</footer>
    </section>
  );
}

App.propTypes = {};

export default App;
