import React from "react";
import PropTypes from "prop-types";
import showMoreTicketsStyles from "./show-more-tickets.module.scss";

function ShowMoreTickets({
  showFiveMoreTickets,
  hasData,
  allFiltersFlag,
  withoutChange,
  oneChange,
  twoChanges,
  threeChanges,
}) {
  const recievedTickets =
    hasData &&
    allFiltersFlag &&
    withoutChange &&
    oneChange &&
    twoChanges &&
    threeChanges ? (
      <footer className={showMoreTicketsStyles.showMoreButton}>
        <button
          type="button"
          className={showMoreTicketsStyles["footer__showmore-button"]}
          onClick={showFiveMoreTickets}
        >
          Показать еще 5 билетов!
        </button>
      </footer>
    ) : (
      <>
        <div className={showMoreTicketsStyles.noTransfgerSelected}>
          Не выбрано количество пересадок
        </div>
      </>
    );
  return <>{recievedTickets}</>;
}

ShowMoreTickets.propTypes = {
  showFiveMoreTickets: PropTypes.func.isRequired,
  hasData: PropTypes.bool.isRequired,
  allFiltersFlag: PropTypes.bool.isRequired,
  withoutChange: PropTypes.bool.isRequired,
  oneChange: PropTypes.bool.isRequired,
  twoChanges: PropTypes.bool.isRequired,
  threeChanges: PropTypes.bool.isRequired,
};

export default ShowMoreTickets;
