import React from "react";
import appStyles from "./App.module.scss";

import Header from "./header";
import TransferCount from "./transfer-count";
import TickersFilters from "./tickets/tickets-filters";
import TickersFound from "./tickets/tickets-found";
import ShowMoreTickets from "./tickets/show-more-tickets";

function App() {
  App.dafeultProps = {};

  return (
    <section className={appStyles.App}>
      <Header />
      <TransferCount />

      <main className={appStyles.tickets}>
        <TickersFilters />
        <TickersFound />
        <ShowMoreTickets />
        {/* <footer className={appStyles.showMoreButton}>
          <button
            type="button"
            className={appStyles["footer__showmore-button"]}
          >
            Показать еще 5 билетов!
          </button>
        </footer> */}
      </main>
    </section>
  );
}

App.propTypes = {};

export default App;
