import { StrictMode } from "react";
import ReactDOM from "react-dom";
// import { ConfigProvider } from 'antd';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

import App from "./App";
import HomePage from "./pages/HomePage";
import Routes from "./routes/Routes";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};
console.log("themesL",themes)

const prevTheme = window.localStorage.getItem("theme");

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
    <Routes />
    </ThemeSwitcherProvider>
 
  </StrictMode>,
  rootElement
);
