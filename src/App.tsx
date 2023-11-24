import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./m1-main/bll/store";
import MainRoutes from "m1-main/navigation/mainRoutes";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Provider store={store}>
          <MainRoutes />
        </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
