import "./AccountLayout.css";
import { Outlet } from "react-router";

function AccountLayout() {
  return (
    <div className="account-content">
      <Outlet />
    </div>
  );
}
export default AccountLayout;
