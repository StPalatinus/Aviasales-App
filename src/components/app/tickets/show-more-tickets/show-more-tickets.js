import React from "react";
import PropTypes from "prop-types";
import showMoreTicketsStyles from "./show-more-tickets.module.scss";

function ShowMoreTickets({ showFiveMoreTickets }) {
  return (
    <footer className={showMoreTicketsStyles.showMoreButton}>
      <button
        type="button"
        className={showMoreTicketsStyles["footer__showmore-button"]}
        onClick={showFiveMoreTickets}
      >
        Показать еще 5 билетов!
      </button>
    </footer>
  );
}

ShowMoreTickets.propTypes = {
  showFiveMoreTickets: PropTypes.func.isRequired,
};

export default ShowMoreTickets;
