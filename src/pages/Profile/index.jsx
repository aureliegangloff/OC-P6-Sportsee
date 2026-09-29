import { useContext } from "react";
import { Navigate } from "react-router";

import ProfileCard from "../../components/ProfileCard";
import AuthContext from "../../utils/context/AuthContext";

function ProfilePage() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="profile">
      <ProfileCard />
    </div>
  );
}

export default ProfilePage;
