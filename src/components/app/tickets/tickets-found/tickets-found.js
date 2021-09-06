/* eslint no-fallthrough: "off" */
/* eslint consistent-return: "off" */
/* eslint array-callback-return: "off" */
import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { ru } from "date-fns/locale";
import tickersFoundStyles from "./tickets-found.module.scss";
import S7Logo from "../../../../img/brands/S7_Logo.svg";
import spinnerGif from "../../../../img/loading_spinner.gif";

function TicketsFound(props) {
  const hasData = !(props.isLoading || props.error);

  const optionsArr = (() => {
    const arr = [];

    if (props.allFiltersFlag) {
      arr.push(10);
      return arr;
    }

    if (
      !props.withoutChange &&
      !props.oneChange &&
      !props.twoChanges &&
      !props.threeChanges
    ) {
      arr.push(-1);
      return arr;
    }

    if (props.withoutChange) {
      arr.push(0);
    }

    if (props.oneChange) {
      arr.push(1);
    }

    if (props.twoChanges) {
      arr.push(2);
    }

    if (props.threeChanges) {
      arr.push(3);
    }

    return arr;
  })();

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

  const sortTickets = (ticketsToSort) => {
    const sortByTransfer = (unsortedTickets) => {
      const sortedByTransfer = unsortedTickets.filter((ticket) => {
        if (optionsArr.length === 1 && optionsArr[0] === 10) {
          return ticket;
        }
        if (optionsArr.length === 1 && optionsArr[0] === -1) {
          return null;
        }
        if (
          optionsArr.length === 1 &&
          optionsArr[0] !== 10 &&
          optionsArr[0] !== -1
        ) {
          if (
            optionsArr[0] === ticket.segments[0].stops.length &&
            optionsArr[0] === ticket.segments[1].stops.length
          ) {
            return ticket;
          }
        }
        if (optionsArr.length > 1) {
          let firstSegment = false;
          let secondSegment = false;
          optionsArr.forEach((option) => {
            if (option === ticket.segments[0].stops.length) {
              firstSegment = true;
            }
            if (option === ticket.segments[1].stops.length) {
              secondSegment = true;
            }
          });
          if (firstSegment && secondSegment) {
            return ticket;
          }
        } else {
          return null;
        }
      });

      return sortedByTransfer;
    };

    const sortByPriority = (unsortedTickets) => {
      let sortedTickets;
      if (props.choseCheapest) {
        sortedTickets = unsortedTickets.sort(
          (prevEl, nextEl) => prevEl.price - nextEl.price
        );
        return sortedTickets;
      }
      if (props.choseFastest) {
        sortedTickets = unsortedTickets.sort((prevEl, nextEl) => {
          const firstTicketDuration =
            prevEl.segments[0].duration + prevEl.segments[1].duration;
          const secondTicketDuration =
            nextEl.segments[0].duration + nextEl.segments[1].duration;
          return firstTicketDuration - secondTicketDuration;
        });
        return sortedTickets;
      }
      if (props.choseOptimal) {
        sortedTickets = unsortedTickets.sort((prevEl, nextEl) => {
          const firstTicketPrice = prevEl.price;
          const secondTicketPrice = nextEl.price;
          const firstTicketDuration =
            prevEl.segments[0].duration + prevEl.segments[1].duration;
          const secondTicketDuration =
            nextEl.segments[0].duration + nextEl.segments[1].duration;
          const firstTicketRatio = firstTicketPrice / firstTicketDuration;
          const secondTicketRatio = secondTicketPrice / secondTicketDuration;

          return firstTicketRatio > secondTicketRatio;
        });
        return sortedTickets;
      }
      return sortedTickets;
    };

    const sortedByTransferTickets = sortByTransfer(ticketsToSort);
    const sortedTickets = sortByPriority(sortedByTransferTickets);

    return sortedTickets;
  };

  const workTickets = sortTickets(props.tickets).slice(0, props.visibleTickets);

  // useEffect(() => {
  //   // workTickets = sortTickets(props.tickets).slice(0, props.visibleTickets);
  // },[props.allFiltersFlag, props.withoutChange, props.oneChange, props.twoChanges, props.threeChanges]);

  if (optionsArr.length === 1 && optionsArr[0] === -1) {
    return <></>;
  }

  const recievedTickets = hasData
    ? workTickets.map((currentTicket) => {
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
                      {/* 1 пересадка */}
                      {formatTransferCount(
                        currentTicket.segments[1].stops.length
                      )}
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

// const mapStateToProps = () => ({});

// const mapDispatchToProps = (dispatch) => {
//   const { getTicketsFromServer, showFiveMoreTickets } = bindActionCreators(
//     actions,
//     dispatch
//   );

//   return {
//     getTicketsFromServer,
//     showFiveMoreTickets,
//   };
// };

TicketsFound.propTypes = {
  visibleTickets: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  choseCheapest: PropTypes.bool.isRequired,
  choseFastest: PropTypes.bool.isRequired,
  choseOptimal: PropTypes.bool.isRequired,
  allFiltersFlag: PropTypes.bool.isRequired,
  withoutChange: PropTypes.bool.isRequired,
  oneChange: PropTypes.bool.isRequired,
  twoChanges: PropTypes.bool.isRequired,
  threeChanges: PropTypes.bool.isRequired,
};

export default TicketsFound;
