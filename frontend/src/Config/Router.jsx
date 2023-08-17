import React from "react";
import { allRoutes } from "./AllRoutes";
import { Route, Routes } from "react-router-dom";
import { Header } from "../ViewComponents/Header/Header";

export const Router = () => {
  return (
    <Routes>
      {allRoutes.map((route, id) => (
        <Route key={id} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Header />} />
    </Routes>
  );
};
