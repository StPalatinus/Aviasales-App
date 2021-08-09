import React from "react";
// import PropTypes from 'prop-types';

import appStyles from "./App.module.scss";
import Header from "./header";
import TransferCount from "./transfer-count";
import TickersFilters from "./tickets/tickets-filters";
import TickersFound from "./tickets/tickets-found";
import ShowMoreTickets from "./tickets/show-more-tickets";
import aviApiService from "../../services";

function App() {
  App.dafeultProps = {};

  const getTickets = async () => {
    const tickets = await aviApiService.getTickets();

    console.log(tickets);
    return tickets;
  };

  // const payload = "test_1";
  // props.testAction1(payload);
  // const payload2 = "test_2";
  // props.testAction2(payload2);

  // console.log(props.testAction1(props.payload));
  // console.log(props.testAction2(props.payload2));
  React.useEffect(() => {
    getTickets();

    // console.log(props.testAction1(props.payload));
    // console.log(props.testAction2(props.payload2));

    // console.log(props.payload);
    // console.log(props.payload2);
  }, []);

  return (
    <section className={appStyles.App}>
      <Header />
      <TransferCount />

      <main className={appStyles.tickets}>
        <TickersFilters />
        <TickersFound />
        <ShowMoreTickets />
      </main>
    </section>
  );
}

// App.propTypes = {
//   testAction1: PropTypes.func.isRequired,
//   testAction2: PropTypes.func.isRequired,
//   payload: PropTypes.string.isRequired,
//   payload2: PropTypes.string.isRequired,
// };

export default App;
