/* eslint no-fallthrough: "off" */
/* eslint consistent-return: "off" */
/* eslint array-callback-return: "off" */
import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { ru } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import ticketsFoundStyles from "./tickets-found.module.scss";
import spinnerGif from "../../../../img/loading_spinner.gif";

function TicketsFound(props) {
  const hasData = !(props.isLoading || props.error);

  const TRANSFGER_OPTIONS = {
    allFiltersChecked: 10,
    noFiltersChecked: -1,
    noChangesChecked: 0,
    oneChangeChecked: 1,
    twoChangesChecked: 2,
    threeChangesChecked: 3,
  };

  const optionsArr = (() => {
    const arr = [];

    if (props.allFiltersFlag) {
      arr.push(TRANSFGER_OPTIONS.allFiltersChecked);
      return arr;
    }

    if (
      !props.withoutChange &&
      !props.oneChange &&
      !props.twoChanges &&
      !props.threeChanges
    ) {
      arr.push(TRANSFGER_OPTIONS.noFiltersChecked);
      return arr;
    }

    if (props.withoutChange) {
      arr.push(TRANSFGER_OPTIONS.noChangesChecked);
    }

    if (props.oneChange) {
      arr.push(TRANSFGER_OPTIONS.oneChangeChecked);
    }

    if (props.twoChanges) {
      arr.push(TRANSFGER_OPTIONS.twoChangesChecked);
    }

    if (props.threeChanges) {
      arr.push(TRANSFGER_OPTIONS.threeChangesChecked);
    }

    return arr;
  })();

  const spinner = (
    <div className="spin-wraper">
      <img
        className={ticketsFoundStyles.ticketsSpinner}
        src={spinnerGif}
        alt="логотип перевозчика"
      />
    </div>
  );

  const formatTransitTime = (date, duration) => {
    const startDateInMiliseconds = Date.parse(date);
    const durationInMiliseconds = startDateInMiliseconds + duration * 60000;

    const startTime = format(startDateInMiliseconds, "HH:mm", { locale: ru });
    const endTime = format(durationInMiliseconds, "HH:mm", {
      locale: ru,
    });

    const res = `${startTime} - ${endTime}`;
    return res;
  };

  const formatDuration = (duration) => {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
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
      switch (true) {
        case props.choseCheapest:
          sortedTickets = unsortedTickets.sort(
            (prevEl, nextEl) => prevEl.price - nextEl.price
          );
          return sortedTickets;
        case props.choseFastest:
          sortedTickets = unsortedTickets.sort((prevEl, nextEl) => {
            const firstTicketDuration =
              prevEl.segments[0].duration + prevEl.segments[1].duration;
            const secondTicketDuration =
              nextEl.segments[0].duration + nextEl.segments[1].duration;
            return firstTicketDuration - secondTicketDuration;
          });
          return sortedTickets;
        case props.choseOptimal: {
          sortedTickets = unsortedTickets.sort((prevEl, nextEl) => {
            const firstTicketPrice = prevEl.price;
            const secondTicketPrice = nextEl.price;
            const firstTicketDuration =
              prevEl.segments[0].duration + prevEl.segments[1].duration;
            const secondTicketDuration =
              nextEl.segments[0].duration + nextEl.segments[1].duration;
            const firstTicketTransfers = prevEl.segments.length;
            const secondTicketTransfers = nextEl.segments.length;
            const firstTicketRatio =
              firstTicketPrice / firstTicketDuration / secondTicketTransfers;
            const secondTicketRatio =
              secondTicketPrice / secondTicketDuration / firstTicketTransfers;

            return firstTicketRatio - secondTicketRatio;
          });
          return sortedTickets;
        }
        default:
          return unsortedTickets;
      }
    };

    const sortedByTransferTickets = sortByTransfer(ticketsToSort);
    const sortedTickets = sortByPriority(sortedByTransferTickets);

    return sortedTickets;
  };

  const workTickets = sortTickets(props.tickets).slice(0, props.visibleTickets);

  const recievedTickets = hasData ? (
    workTickets.map((currentTicket) => {
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
      const flyCompanyLogo = `http:////pics.avs.io/99/36/${currentTicket.carrier}.png`;
      return (
        <div className={ticketsFoundStyles.tickets__ticket} key={uuidv4()}>
          <div className={ticketsFoundStyles.ticketHeader}>
            <div className={ticketsFoundStyles.ticketPrice}>
              {currentTicket.price} Р
            </div>
            <img
              className={ticketsFoundStyles.brandLogo}
              src={flyCompanyLogo}
              alt="логотип перевозчика"
            />
          </div>
          <div>
            <table className={ticketsFoundStyles.ticketInfo__table}>
              <tbody>
                <tr>
                  <td
                    className={
                      ticketsFoundStyles.ticketInfo__destinationsHeading
                    }
                  >
                    {firstSegment}
                  </td>
                  <td
                    className={ticketsFoundStyles.ticketInfo__travelTimeHeading}
                  >
                    В пути
                  </td>
                  <td
                    className={
                      ticketsFoundStyles.ticketInfo__transferCountHeading
                    }
                  >
                    {formatTransferCount(
                      currentTicket.segments[0].stops.length
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={ticketsFoundStyles.ticketInfo__destinations}>
                    {formatTransitTime(
                      currentTicket.segments[0].date,
                      currentTicket.segments[0].duration
                    )}
                  </td>
                  <td className={ticketsFoundStyles.ticketInfo__travelTime}>
                    {formatDuration(currentTicket.segments[0].duration)}
                  </td>
                  <td className={ticketsFoundStyles.ticketInfo__transferCount}>
                    {currentTicket.segments[0].stops.join(",")}
                  </td>
                </tr>
                <tr>
                  <td
                    className={
                      ticketsFoundStyles.ticketInfo__destinationsHeading
                    }
                  >
                    {secondSegment}
                  </td>
                  <td
                    className={ticketsFoundStyles.ticketInfo__travelTimeHeading}
                  >
                    В пути
                  </td>
                  <td
                    className={
                      ticketsFoundStyles.ticketInfo__transferCountHeading
                    }
                  >
                    {formatTransferCount(
                      currentTicket.segments[1].stops.length
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={ticketsFoundStyles.ticketInfo__destinations}>
                    {formatTransitTime(
                      currentTicket.segments[1].date,
                      currentTicket.segments[1].duration
                    )}
                  </td>
                  <td className={ticketsFoundStyles.ticketInfo__travelTime}>
                    {formatDuration(currentTicket.segments[1].duration)}
                  </td>
                  <td className={ticketsFoundStyles.ticketInfo__transferCount}>
                    {currentTicket.segments[1].stops.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    })
  ) : (
    <div className={ticketsFoundStyles.tickets__ticket} key={uuidv4()}>
      {spinner}
    </div>
  );

  if (optionsArr.length === 1 && optionsArr[0] === -1) {
    return (
      <section className={ticketsFoundStyles.tickets__section}>
        <h1 className={ticketsFoundStyles["visually-hidden"]}>
          подоборка билетов
        </h1>
        {recievedTickets}
      </section>
    );
  }

  return (
    <section className={ticketsFoundStyles.tickets__section}>
      <h1 className={ticketsFoundStyles["visually-hidden"]}>
        подоборка билетов
      </h1>
      {recievedTickets}
    </section>
  );
}

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
