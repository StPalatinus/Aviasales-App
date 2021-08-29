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
        <TicketsFilters />
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
});

const mapDispatchToProps = (dispatch) => {
  const { getTicketsFromServer } = bindActionCreators(actions, dispatch);

  return {
    getTicketsFromServer,
  };
};

App.propTypes = {
  getTicketsFromServer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  visibleTickets: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
