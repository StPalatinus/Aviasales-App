import React from "react";
import appStyles from "./App.module.scss";
import mainLogo from "../../img/mainlogo.svg";
import S7Logo from "../../img/brands/S7_Logo.svg";

function App() {
  App.dafeultProps = {};

  const checked = true;
  const unchecked = false;

  return (
    <section className={appStyles.App}>
      <header className={appStyles.header}>
        <img
          className={appStyles["header--logo"]}
          src={mainLogo}
          alt="Логотип компании"
        />
      </header>
      <aside className={appStyles["transfer-count"]}>
        <h1 className={appStyles["transfer-count__header"]}>
          Количество пересадок
        </h1>
        <form className={appStyles["transfer-count__filter"]}>
          <input
            className={appStyles["transfer-count__filter-checkbox"]}
            type="checkbox"
            checked={unchecked}
            onChange={() => {}}
            id="all"
          />
          <label
            className={appStyles["transfer-count__filter-checkbox-label"]}
            htmlFor="all"
          >
            <span
              className={
                appStyles["transfer-count__filter-checkbox-label-text"]
              }
            >
              Все
            </span>
          </label>
          <input
            className={appStyles["transfer-count__filter-checkbox"]}
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            id="withoutChange"
          />
          <label
            className={appStyles["transfer-count__filter-checkbox-label"]}
            htmlFor="withoutChange"
          >
            <span
              className={
                appStyles["transfer-count__filter-checkbox-label-text"]
              }
            >
              Без пересадок
            </span>
          </label>
          <input
            className={appStyles["transfer-count__filter-checkbox"]}
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            id="oneChange"
          />
          <label
            className={appStyles["transfer-count__filter-checkbox-label"]}
            htmlFor="oneChange"
          >
            <span
              className={
                appStyles["transfer-count__filter-checkbox-label-text"]
              }
            >
              1 пересадка
            </span>
          </label>
          <input
            className={appStyles["transfer-count__filter-checkbox"]}
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            id="twoChanges"
          />
          <label
            className={appStyles["transfer-count__filter-checkbox-label"]}
            htmlFor="twoChanges"
          >
            <span
              className={
                appStyles["transfer-count__filter-checkbox-label-text"]
              }
            >
              2 пересадки
            </span>
          </label>
          <input
            className={appStyles["transfer-count__filter-checkbox"]}
            type="checkbox"
            checked={unchecked}
            onChange={() => {}}
            id="threeChanges"
          />
          <label
            className={appStyles["transfer-count__filter-checkbox-label"]}
            htmlFor="threeChanges"
          >
            <span
              className={
                appStyles["transfer-count__filter-checkbox-label-text"]
              }
            >
              3 пересадки
            </span>
          </label>
        </form>
      </aside>

      <main className={appStyles.tickets}>
        <form className={appStyles["tickets__filter-section"]}>
          <input
            className={appStyles["tickets__filter-radio-button"]}
            type="radio"
            name="price-filter"
            id="cheapest"
            value="самый дешевый"
          />
          <label
            className={appStyles["tickets__filter-radio-button--label"]}
            htmlFor="cheapest"
          >
            <span
              className={appStyles["tickets__filter-radio-button--label-text"]}
            >
              самый дешевый
            </span>
          </label>
          <input
            className={appStyles["tickets__filter-radio-button"]}
            type="radio"
            name="price-filter"
            id="fastest"
            value="самый быстрый"
          />
          <label
            className={appStyles["tickets__filter-radio-button--label"]}
            htmlFor="fastest"
          >
            <span
              className={appStyles["tickets__filter-radio-button--label-text"]}
            >
              самый быстрый
            </span>
          </label>
          <input
            className={appStyles["tickets__filter-radio-button"]}
            type="radio"
            name="price-filter"
            id="optimal"
            value="оптимальный"
          />
          <label
            className={appStyles["tickets__filter-radio-button--label"]}
            htmlFor="optimal"
          >
            <span
              className={appStyles["tickets__filter-radio-button--label-text"]}
            >
              оптимальный
            </span>
          </label>
        </form>
        <section className={appStyles.tickets__section}>
          <h1 className={appStyles["visually-hidden"]}>подоборка билетов</h1>
          <div className={appStyles.tickets__ticket}>
            <div className={appStyles.ticketHeader}>
              <div className={appStyles.ticketPrice}>13 400 Р</div>
              <img
                className={appStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>2 пересадки</td>
                  </tr>
                  <tr>
                    <td>10:45 – 08:00</td>
                    <td>21ч 15м</td>
                    <td>HKG, JNB</td>
                  </tr>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>1 пересадка</td>
                  </tr>
                  <tr>
                    <td>11:20 – 00:50</td>
                    <td>13ч 30м</td>
                    <td>HKG</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>sect2</div>
            <div>sect3</div>
          </div>
          <div className={appStyles.tickets__ticket}>
            <div className={appStyles.ticketHeader}>
              <div className={appStyles.ticketPrice}>13 400 Р</div>
              <img
                className={appStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>2 пересадки</td>
                  </tr>
                  <tr>
                    <td>10:45 – 08:00</td>
                    <td>21ч 15м</td>
                    <td>HKG, JNB</td>
                  </tr>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>1 пересадка</td>
                  </tr>
                  <tr>
                    <td>11:20 – 00:50</td>
                    <td>13ч 30м</td>
                    <td>HKG</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>sect2</div>
            <div>sect3</div>
          </div>
          <div className={appStyles.tickets__ticket}>
            <div className={appStyles.ticketHeader}>
              <div className={appStyles.ticketPrice}>13 400 Р</div>
              <img
                className={appStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>2 пересадки</td>
                  </tr>
                  <tr>
                    <td>10:45 – 08:00</td>
                    <td>21ч 15м</td>
                    <td>HKG, JNB</td>
                  </tr>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>1 пересадка</td>
                  </tr>
                  <tr>
                    <td>11:20 – 00:50</td>
                    <td>13ч 30м</td>
                    <td>HKG</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>sect2</div>
            <div>sect3</div>
          </div>
          <div className={appStyles.tickets__ticket}>
            <div className={appStyles.ticketHeader}>
              <div className={appStyles.ticketPrice}>13 400 Р</div>
              <img
                className={appStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>2 пересадки</td>
                  </tr>
                  <tr>
                    <td>10:45 – 08:00</td>
                    <td>21ч 15м</td>
                    <td>HKG, JNB</td>
                  </tr>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>1 пересадка</td>
                  </tr>
                  <tr>
                    <td>11:20 – 00:50</td>
                    <td>13ч 30м</td>
                    <td>HKG</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>sect2</div>
            <div>sect3</div>
          </div>
          <div className={appStyles.tickets__ticket}>
            <div className={appStyles.ticketHeader}>
              <div className={appStyles.ticketPrice}>13 400 Р</div>
              <img
                className={appStyles.brandLogo}
                src={S7Logo}
                alt="логотип перевозчика"
              />
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>2 пересадки</td>
                  </tr>
                  <tr>
                    <td>10:45 – 08:00</td>
                    <td>21ч 15м</td>
                    <td>HKG, JNB</td>
                  </tr>
                  <tr>
                    <td>MOW – HKT</td>
                    <td>В пути</td>
                    <td>1 пересадка</td>
                  </tr>
                  <tr>
                    <td>11:20 – 00:50</td>
                    <td>13ч 30м</td>
                    <td>HKG</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>sect2</div>
            <div>sect3</div>
          </div>
        </section>
        <footer className={appStyles.footer}>
          <button
            type="button"
            className={appStyles["footer__showmore-button"]}
          >
            Показать еще 5 билетов!
          </button>
        </footer>
      </main>
    </section>
  );
}

App.propTypes = {};

export default App;
