import React from "react";
import PropTypes from "prop-types";
import tickersFiltersStyles from "./tickets-filters.module.scss";

function TicketsFilters(props) {
  return (
    <form className={tickersFiltersStyles["tickets__filter-section"]}>
      <input
        className={tickersFiltersStyles["tickets__filter-radio-button"]}
        type="radio"
        name="price-filter"
        id="cheapest"
        value="самый дешевый"
        checked={props.choseCheapest}
        onClick={props.selectCheapest}
        onSelect={props.selectCheapest}
      />
      <label
        className={tickersFiltersStyles["tickets__filter-radio-button--label"]}
        htmlFor="cheapest"
      >
        <span
          className={
            tickersFiltersStyles["tickets__filter-radio-button--label-text"]
          }
        >
          самый дешевый
        </span>
      </label>
      <input
        className={tickersFiltersStyles["tickets__filter-radio-button"]}
        type="radio"
        name="price-filter"
        id="fastest"
        value="самый быстрый"
        checked={props.choseFastest}
        onClick={props.selectFastest}
        onSelect={props.selectFastest}
      />
      <label
        className={tickersFiltersStyles["tickets__filter-radio-button--label"]}
        htmlFor="fastest"
      >
        <span
          className={
            tickersFiltersStyles["tickets__filter-radio-button--label-text"]
          }
        >
          самый быстрый
        </span>
      </label>
      <input
        className={tickersFiltersStyles["tickets__filter-radio-button"]}
        type="radio"
        name="price-filter"
        id="optimal"
        value="оптимальный"
        checked={props.choseOptimal}
        onClick={props.selectOptimal}
        onSelect={props.selectOptimal}
      />
      <label
        className={tickersFiltersStyles["tickets__filter-radio-button--label"]}
        htmlFor="optimal"
      >
        <span
          className={
            tickersFiltersStyles["tickets__filter-radio-button--label-text"]
          }
        >
          оптимальный
        </span>
      </label>
    </form>
  );
}

TicketsFilters.propTypes = {
  choseCheapest: PropTypes.bool.isRequired,
  choseFastest: PropTypes.bool.isRequired,
  choseOptimal: PropTypes.bool.isRequired,
  selectCheapest: PropTypes.func.isRequired,
  selectFastest: PropTypes.func.isRequired,
  selectOptimal: PropTypes.func.isRequired,
};

export default TicketsFilters;
