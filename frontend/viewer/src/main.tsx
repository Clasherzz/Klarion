import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ComplaintsList from "./pages/ComplaintsList";
import ComplaintDetails from "./pages/ComplaintsDetails";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ComplaintsList />} />
          <Route path="complaint/:id" element={<ComplaintDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
