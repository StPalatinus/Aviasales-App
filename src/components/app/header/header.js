import React from "react";
import mainLogo from "../../../img/mainlogo.svg";
import headerStyles from "./header.module.scss";

function Header() {
  return (
    <header className={headerStyles.header}>
      <img
        className={headerStyles["header--logo"]}
        src={mainLogo}
        alt="Логотип компании"
      />
    </header>
  );
}

export default Header;
