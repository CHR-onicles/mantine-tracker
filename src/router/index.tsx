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
import { Transactions } from "@pages/Transactions";

import { AppShellLayout } from "@layouts/AppShell";


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
      <Route path="transactions" element={<Transactions />} />
      <Route
        path="accounts"
        element={
          <AppShellLayout>
            <h1>🚧 W.I.P</h1>
          </AppShellLayout>
        }
      />
      <Route
        path="budgets"
        element={
          <AppShellLayout>
            <h1>🚧 W.I.P</h1>
          </AppShellLayout>
        }
      />
      <Route
        path="reports"
        element={
          <AppShellLayout>
            <h1>🚧 W.I.P</h1>
          </AppShellLayout>
        }
      />
      <Route
        path="settings"
        element={
          <AppShellLayout>
            <h1>🚧 W.I.P</h1>
          </AppShellLayout>
        }
      />
      <Route path="*" element={<h1> Oops! This page does not exist</h1>} />
    </Route>
  )
);
