import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actions from "../../../../actions";
import tickersFoundStyles from "./tickets-found.module.scss";
import S7Logo from "../../../../img/brands/S7_Logo.svg";
import spinnerGif from "../../../../img/loading_spinner.gif";

function TicketsFound(props) {
  const hasData = !(props.isLoading || props.error);

  const spinner = (
    <div className="spin-wraper">
      <img
        className={tickersFoundStyles.ticketsSpinner}
        src={spinnerGif}
        alt="логотип перевозчика"
      />
    </div>
  );

  const multiplySpiner = (times) => {
    const spiners = [];
    for (let i = 0; i < times; i++) {
      spiners[i] = (
        <div className={tickersFoundStyles.tickets__ticket}>{spinner}</div>
      );
    }
    return spiners;
  };

  const workTickets = props.tickets.slice(0, props.visibleTickets);
  console.log(workTickets);

  const recievedTickets = hasData
    ? workTickets.map((currentTicket) => {
        console.log(hasData);
        console.log(currentTicket);

        return (
          <div className={tickersFoundStyles.tickets__ticket}>
            <div className={tickersFoundStyles.ticketHeader}>
              <div className={tickersFoundStyles.ticketPrice}>13 400 Р</div>
              <img
                className={tickersFoundStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table className={tickersFoundStyles.ticketInfo__table}>
                <tbody>
                  <tr>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__destinationsHeading
                      }
                    >
                      MOW – HKT
                    </td>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__travelTimeHeading
                      }
                    >
                      В пути
                    </td>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__transferCountHeading
                      }
                    >
                      2 пересадки
                    </td>
                  </tr>
                  <tr>
                    <td className={tickersFoundStyles.ticketInfo__destinations}>
                      10:45 – 08:00
                    </td>
                    <td className={tickersFoundStyles.ticketInfo__travelTime}>
                      21ч 15м
                    </td>
                    <td
                      className={tickersFoundStyles.ticketInfo__transferCount}
                    >
                      HKG, JNB
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__destinationsHeading
                      }
                    >
                      MOW – HKT
                    </td>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__travelTimeHeading
                      }
                    >
                      В пути
                    </td>
                    <td
                      className={
                        tickersFoundStyles.ticketInfo__transferCountHeading
                      }
                    >
                      1 пересадка
                    </td>
                  </tr>
                  <tr>
                    <td className={tickersFoundStyles.ticketInfo__destinations}>
                      11:20 – 00:50
                    </td>
                    <td className={tickersFoundStyles.ticketInfo__travelTime}>
                      13ч 30м
                    </td>
                    <td
                      className={tickersFoundStyles.ticketInfo__transferCount}
                    >
                      HKG
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })
    : multiplySpiner(props.visibleTickets);

  return (
    <section className={tickersFoundStyles.tickets__section}>
      <h1 className={tickersFoundStyles["visually-hidden"]}>
        подоборка билетов
      </h1>
      {recievedTickets}
    </section>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  const { getTicketsFromServer, showFiveMoreTickets } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    getTicketsFromServer,
    showFiveMoreTickets,
  };
};

TicketsFound.propTypes = {
  visibleTickets: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsFound);
