import { RouterProvider } from "react-router-dom";

import { GlobalStyles } from "@styles/GlobalStyles.styled";

import { router } from "./router";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

export const App = () => {
  return (
    <MantineProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
