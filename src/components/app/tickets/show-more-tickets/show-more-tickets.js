import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import showMoreTicketsStyles from "./show-more-tickets.module.scss";
import actions from "../../../../actions";

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

const mapStateToProps = (state) => ({
  visibleTickets: state.mainReducer.visibleTickets,
});

const mapDispatchToProps = (dispatch) => {
  const {
    // getTicketsFromServer,
    showFiveMoreTickets,
  } = bindActionCreators(actions, dispatch);

  return {
    // getTicketsFromServer,
    showFiveMoreTickets,
  };
};

ShowMoreTickets.propTypes = {
  showFiveMoreTickets: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreTickets);
