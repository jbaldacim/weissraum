import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles.js";
import { theme } from "./styles/theme.js";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Fonts
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/dm-mono/400.css";

import Home from "./views/Home";
import Archive from "./views/Archive";
import NewEntry from "./views/NewEntry";
import Entry from "./views/Entry";
import Nav from "./components/Nav/Nav.jsx";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/archive", element: <Archive /> },
      { path: "/entries/new", element: <NewEntry /> },
      { path: "/entries/:id", element: <Entry /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
