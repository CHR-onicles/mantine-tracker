import { RouterProvider } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { GlobalStyles } from "@styles/GlobalStyles.styled";

import { COLOR_SCHEME_KEY } from "./constants";
import { router } from "./router";

import "@mantine/core/styles.css";


const theme = createTheme({
  breakpoints: {
    xs: "30em", // 576px
    sm: "48em", // 768px
    md: "64em", // 992px
    lg: "74em", // 1200px
    xl: "90em", // 1408px
  },
});

export const App = () => {
  const [_] = useLocalStorage<"light" | "dark">({
    key: COLOR_SCHEME_KEY,
    defaultValue: "light",
  });

  return (
    <MantineProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
