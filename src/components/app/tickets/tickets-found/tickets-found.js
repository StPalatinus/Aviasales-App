import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { ru } from "date-fns/locale";
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

  const formatDate = (date, duration) => {
    const startDateInSeconds = Date.parse(date);
    const durationInSeconds = startDateInSeconds + duration * 60;

    const startTime = format(startDateInSeconds, "HH:MM", { locale: ru });
    const endTime = format(startDateInSeconds - durationInSeconds, "HH:MM", {
      locale: ru,
    });

    const res = `${startTime} - ${endTime}`;

    return res;
  };

  const workTickets = props.tickets.slice(0, props.visibleTickets);
  // console.log(workTickets);

  const recievedTickets = hasData
    ? workTickets.map((currentTicket) => {
        // console.log(currentTicket);

        const formatDuration = (duration) => {
          const hours = Math.trunc(duration / 60);
          const minutes = duration % 60;
          return `${hours}ч ${minutes}м`;
        };

        const formatTransferCount = (transfersArr) => {
          switch (true) {
            case transfersArr === 0:
              return `без пересадок`;
            case transfersArr === 1:
              return `1 пересадка`;
            case transfersArr === 2:
            case transfersArr === 3:
            case transfersArr === 4:
              return `${transfersArr} пересадки`;
            default:
              return `${transfersArr} пересадок`;
          }
        };

        const firstSegment = `${currentTicket.segments[0].origin} - ${currentTicket.segments[0].destination}`;
        const secondSegment = `${currentTicket.segments[1].origin} - ${currentTicket.segments[1].destination}`;

        return (
          <div className={tickersFoundStyles.tickets__ticket}>
            <div className={tickersFoundStyles.ticketHeader}>
              <div className={tickersFoundStyles.ticketPrice}>
                {currentTicket.price} Р
              </div>
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
                      {firstSegment}
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
                      {formatTransferCount(
                        currentTicket.segments[0].stops.length
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={tickersFoundStyles.ticketInfo__destinations}>
                      {formatDate(
                        currentTicket.segments[0].date,
                        currentTicket.segments[0].duration
                      )}
                    </td>
                    <td className={tickersFoundStyles.ticketInfo__travelTime}>
                      {formatDuration(currentTicket.segments[0].duration)}
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
                      {secondSegment}
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
                      {formatDate(
                        currentTicket.segments[1].date,
                        currentTicket.segments[1].duration
                      )}
                    </td>
                    <td className={tickersFoundStyles.ticketInfo__travelTime}>
                      {formatDuration(currentTicket.segments[1].duration)}
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
