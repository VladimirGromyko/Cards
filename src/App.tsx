import React from "react";
import "./App.css";
import {
  HashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Main from "./Main";
import store from "./m1-main/bll/store";

// const router = createBrowserRouter([
//   {
//     element: <Main />,
//     path: "/",
//   },
// ]);
function App() {
  // return (
  //   <Provider store={store}>
  //     <RouterProvider router={router} />
  //   </Provider>
  // );
  return (
    <div className="App">
      <HashRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
