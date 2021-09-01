import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import appStyles from "./App.module.scss";
import Header from "./header";
import TransferCount from "./transfer-count";
import TicketsFilters from "./tickets/tickets-filters";
import TicketsFound from "./tickets/tickets-found";
import ShowMoreTickets from "./tickets/show-more-tickets";
import actions from "../../actions";

function App({
  getTicketsFromServer,
  isLoading,
  error,
  visibleTickets,
  tickets,
  choseCheapest,
  choseFastest,
  choseOptimal,
  selectCheapest,
  selectFastest,
  selectOptimal,
}) {
  App.dafeultProps = {};

  const hasData = !(isLoading || error);

  React.useEffect(() => {
    getTicketsFromServer();
  }, []);

  return (
    <section className={appStyles.App}>
      <Header hasData={hasData} />
      <TransferCount />

      <main className={appStyles.tickets}>
        <TicketsFilters
          choseCheapest={choseCheapest}
          choseFastest={choseFastest}
          choseOptimal={choseOptimal}
          selectCheapest={selectCheapest}
          selectFastest={selectFastest}
          selectOptimal={selectOptimal}
        />
        <TicketsFound
          hasData={hasData}
          visibleTickets={visibleTickets}
          tickets={tickets}
          isLoading={isLoading}
          error={error}
        />
        <ShowMoreTickets />
      </main>
    </section>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.mainReducer.isLoading,
  error: state.mainReducer.error,
  visibleTickets: state.mainReducer.visibleTickets,
  tickets: state.mainReducer.tickets,
  choseCheapest: state.filtersReducer.choseCheapest,
  choseFastest: state.filtersReducer.choseFastest,
  choseOptimal: state.filtersReducer.choseOptimal,
});

const mapDispatchToProps = (dispatch) => {
  const { getTicketsFromServer, selectCheapest, selectFastest, selectOptimal } =
    bindActionCreators(actions, dispatch);

  return {
    getTicketsFromServer,
    selectCheapest,
    selectFastest,
    selectOptimal,
  };
};

App.propTypes = {
  getTicketsFromServer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  visibleTickets: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  choseCheapest: PropTypes.bool.isRequired,
  choseFastest: PropTypes.bool.isRequired,
  choseOptimal: PropTypes.bool.isRequired,
  selectCheapest: PropTypes.func.isRequired,
  selectFastest: PropTypes.func.isRequired,
  selectOptimal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
