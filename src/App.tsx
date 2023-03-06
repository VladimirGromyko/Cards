import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./Main";
import store from "./m1-main/bll/store";

function App() {
  return (
      <div className="App">
        <HashRouter>
          <Provider store={store}>
            <Main/>
          </Provider>
        </HashRouter>
      </div>
  );
}

export default App;
