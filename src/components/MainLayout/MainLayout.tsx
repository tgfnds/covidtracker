import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="app">
      <header className="header">
        <img src="logo_covid-128.png" className="header__icon" alt="logo" />
        <span>Covid-19</span>
      </header>
      <div className="content">{children}</div>
      <footer className="footer">
        <span className="footer__item">
          <span>Made by Tiago Fernandes - 2020</span>
          <a className="footer__link" href="https://tgfnds.dev">
            tgfnds.dev
          </a>
        </span>
      </footer>
    </div>
  );
};

export default MainLayout;
