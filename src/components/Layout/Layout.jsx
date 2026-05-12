import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav.jsx";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Layout;
