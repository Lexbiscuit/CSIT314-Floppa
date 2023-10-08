import { Outlet } from "react-router-dom";
import Appshell from "../components/Appshell";

export default function Layout() {
  return (
    <Appshell>
      <Outlet />
    </Appshell>
  );
}
