import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  ScrollRestoration,
} from "react-router-dom";

import { Dashboard } from "@pages/Dashboard";
import { SignIn } from "@pages/SignIn";


const Root = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="signin" />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1> Oops! This page does not exist</h1>} />
    </Route>
  )
);
