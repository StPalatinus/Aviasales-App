import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import asideStyles from "./transfer-count.module.scss";
import * as actions from "../../actions";

// console.log(toggleAllFlags);

function TransferCount({
  withoutChange,
  oneChange,
  twoChanges,
  threeChanges,
  allFiltersFlag,
  toggleAllFlags,
  toggleWithoutChange,
  toggleOneChange,
  toggleTwoChanges,
  toggleThreeChanges,
}) {
  return (
    <aside className={asideStyles["transfer-count"]}>
      <h1 className={asideStyles["transfer-count__header"]}>
        Количество пересадок
      </h1>
      <form className={asideStyles["transfer-count__filter"]}>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={allFiltersFlag}
          onChange={toggleAllFlags}
          id="allflags"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="allflags"
        >
          <span
            className={
              asideStyles["transfer-count__filter-checkbox-label-text"]
            }
          >
            Все
          </span>
        </label>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={withoutChange}
          onChange={toggleWithoutChange}
          id="withoutChange"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="withoutChange"
        >
          <span
            className={
              asideStyles["transfer-count__filter-checkbox-label-text"]
            }
          >
            Без пересадок
          </span>
        </label>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={oneChange}
          onChange={toggleOneChange}
          id="oneChange"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="oneChange"
        >
          <span
            className={
              asideStyles["transfer-count__filter-checkbox-label-text"]
            }
          >
            1 пересадка
          </span>
        </label>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={twoChanges}
          onChange={toggleTwoChanges}
          id="twoChanges"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="twoChanges"
        >
          <span
            className={
              asideStyles["transfer-count__filter-checkbox-label-text"]
            }
          >
            2 пересадки
          </span>
        </label>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={threeChanges}
          onChange={toggleThreeChanges}
          id="threeChanges"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="threeChanges"
        >
          <span
            className={
              asideStyles["transfer-count__filter-checkbox-label-text"]
            }
          >
            3 пересадки
          </span>
        </label>
      </form>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  allFiltersFlag: state.allFiltersFlag,
  withoutChange: state.withoutChange,
  oneChange: state.oneChange,
  twoChanges: state.twoChanges,
  threeChanges: state.threeChanges,
});

const mapDispatchToProps = (dispatch) => {
  const {
    toggleAllFlags,
    toggleWithoutChange,
    toggleOneChange,
    toggleTwoChanges,
    toggleThreeChanges,
  } = bindActionCreators(actions, dispatch);

  return {
    toggleAllFlags,
    toggleWithoutChange,
    toggleOneChange,
    toggleTwoChanges,
    toggleThreeChanges,
  };
};

TransferCount.propTypes = {
  allFiltersFlag: PropTypes.bool.isRequired,
  withoutChange: PropTypes.bool.isRequired,
  oneChange: PropTypes.bool.isRequired,
  twoChanges: PropTypes.bool.isRequired,
  threeChanges: PropTypes.bool.isRequired,
  toggleAllFlags: PropTypes.func.isRequired,
  toggleWithoutChange: PropTypes.func.isRequired,
  toggleOneChange: PropTypes.func.isRequired,
  toggleTwoChanges: PropTypes.func.isRequired,
  toggleThreeChanges: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferCount);
