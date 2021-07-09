import React from "react";
import tickersFiltersStyles from "./tickets-filters.module.scss";

function TickersFilters() {
  return (
    <form className={tickersFiltersStyles["tickets__filter-section"]}>
      <input
        className={tickersFiltersStyles["tickets__filter-radio-button"]}
        type="radio"
        name="price-filter"
        id="cheapest"
        value="самый дешевый"
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

export default TickersFilters;
