import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App.js";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const basename = (() => {
  try {
    const url = new URL(process.env.PUBLIC_URL || "/", window.location.origin);
    const path = url.pathname;
    return path.endsWith("/") ? (path.length > 1 ? path.slice(0, -1) : "/") : path;
  } catch {
    return "/";
  }
})();

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);