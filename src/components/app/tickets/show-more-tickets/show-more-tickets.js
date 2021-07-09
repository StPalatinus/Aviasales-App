import React from "react";
import showMoreTicketsStyles from "./show-more-tickets.module.scss";

function showMoreTickets() {
  return (
    <footer className={showMoreTicketsStyles.showMoreButton}>
      <button
        type="button"
        className={showMoreTicketsStyles["footer__showmore-button"]}
      >
        Показать еще 5 билетов!
      </button>
    </footer>
  );
}

export default showMoreTickets;
