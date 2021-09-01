import React from "react";
import PropTypes from "prop-types";
import mainLogo from "../../../img/mainlogo.svg";
import headerStyles from "./header.module.scss";

function Header(props) {
  const loadingAnimatedHeader = props.hasData ? (
    <header className={headerStyles.header}>
      <img
        className={headerStyles["header--logo"]}
        src={mainLogo}
        alt="Логотип компании"
      />
    </header>
  ) : (
    <header className={[headerStyles.header, headerStyles.ldscircle].join(" ")}>
      <img
        className={headerStyles["header--logo"]}
        src={mainLogo}
        alt="Логотип компании"
      />
    </header>
  );
  return <>{loadingAnimatedHeader}</>;
}

Header.propTypes = {
  hasData: PropTypes.bool.isRequired,
};

export default Header;
