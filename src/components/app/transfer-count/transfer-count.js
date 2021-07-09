import React from "react";
import asideStyles from "./transfer-count.module.scss";

function TransferCount() {
  const checked = true;
  const unchecked = false;

  return (
    <aside className={asideStyles["transfer-count"]}>
      <h1 className={asideStyles["transfer-count__header"]}>
        Количество пересадок
      </h1>
      <form className={asideStyles["transfer-count__filter"]}>
        <input
          className={asideStyles["transfer-count__filter-checkbox"]}
          type="checkbox"
          checked={unchecked}
          onChange={() => {}}
          id="all"
        />
        <label
          className={asideStyles["transfer-count__filter-checkbox-label"]}
          htmlFor="all"
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
          checked={checked}
          onChange={() => {}}
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
          checked={checked}
          onChange={() => {}}
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
          checked={checked}
          onChange={() => {}}
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
          checked={unchecked}
          onChange={() => {}}
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

export default TransferCount;
