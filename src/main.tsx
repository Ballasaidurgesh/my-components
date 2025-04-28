import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.scss";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          error: { style: { backgroundColor: "#FDEDED" } },
          success: { style: { backgroundColor: "#EDF7ED" } },
        }}
      />
    </Provider>
  </React.StrictMode>,
);
