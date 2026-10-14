import { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/context/AuthContext";
import { fetchUserActivities } from "../../utils/api.js";

export const useUserActivity = (startDate, endDate) => {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        setError(null);

        const activities = await fetchUserActivities(token, startDate, endDate);
        setData(activities);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [token, startDate, endDate]);

  return {
    data,
    loading,
    error,
  };
};
