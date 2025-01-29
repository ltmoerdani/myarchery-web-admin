import React from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts";
import { AuthenticationMiddleware } from "./middlewares";
import {
  authenticationRoutes,
  dashboardRoutes,
  certificateRoutes,
  workingRoutes,
  dosRoutes,
  liveScoreRoutes,
} from "./routes";

import { LayoutDashboard, LayoutLiveScores } from "layouts/ma";
import { LayoutDashboardDos } from "layouts/dashboard-dos";

import { EventDetailProvider } from "contexts/event-detail";

import "./assets/scss/theme.scss";
import "react-datepicker/dist/react-datepicker.css";
import { HelmetProvider } from 'react-helmet-async'

const renderRoutes = (routes, layout, isAuthProtected) =>
  routes.map((route) => (
    <Route
      path={route.path}
      key={route.path}
      element={
        <AuthenticationMiddleware
          layout={layout}
          component={route.component}
          isAuthProtected={isAuthProtected}
        />
      }
    />
  ));

const LoginRedirect = () => <Navigate to="/login" replace />;

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <EventDetailProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AuthenticationMiddleware
                  layout={React.Fragment}
                  component={LoginRedirect}
                  isAuthProtected={false}
                />
              }
            />
            {renderRoutes(authenticationRoutes, AuthLayout, false)}
            {renderRoutes(dashboardRoutes, LayoutDashboard, true)}
            {renderRoutes(certificateRoutes, LayoutDashboard, true)}
            {renderRoutes(liveScoreRoutes, LayoutLiveScores, false)}
            {renderRoutes(workingRoutes, AuthLayout, false)}
            {renderRoutes(dosRoutes, LayoutDashboardDos, false)}
            <Route path="*" element={<Navigate to="/working/not-found" replace />} />
          </Routes>
        </EventDetailProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
