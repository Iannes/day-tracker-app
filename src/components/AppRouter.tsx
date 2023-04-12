import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import MainContent from "./MainContent";

export enum AppRoutes {
  Login = '/',
  SignUp = '/account',
  App = '/app',
}

const NotFound = () => {
  return <h1>Not Found</h1>
}

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.SignUp} element={<SignUp />} />
        <Route path={AppRoutes.Login} element={<SignIn />} />
        <Route path={AppRoutes.App} element={<MainContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
