import { useContext } from "react";
import { Navigate, useParams } from "react-router";

import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "../../utils/context";

function ProfilePage() {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);

  if (!token || token !== userId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="profile">
      <ProfileCard />
    </div>
  );
}

export default ProfilePage;
