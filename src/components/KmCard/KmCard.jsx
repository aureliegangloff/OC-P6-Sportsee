import styles from "./KmCard.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../utils/context/AuthContext";
import RangeDate from "../RangeDate/RangeDate";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function KmCard({ S1, S2, S3, S4 }) {
  const { activityUser } = useContext(AuthContext);

  function calculateDistanceForWeek(week) {
    const weekActivities = activityUser.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate >= week.start && activityDate <= week.end;
    });
    return weekActivities.reduce(
      (total, activity) => total + activity.distance,
      0,
    );
  }

  const data = [
    { week: "S1", km: calculateDistanceForWeek(S1) },
    { week: "S2", km: calculateDistanceForWeek(S2) },
    { week: "S3", km: calculateDistanceForWeek(S3) },
    { week: "S4", km: calculateDistanceForWeek(S4) },
  ];

  const averageLastMonth = data.length
    ? Math.round(
        data.reduce((total, activity) => total + activity.km, 0) / data.length,
      )
    : 0;

  // State for the selected date range
  const [startLastMonthDate, setStartLastMonthDate] = useState(S1.start);
  const [endLastMonthDate, setEndLastMonthDate] = useState(S4.end);

  return (
    <div className={styles.kmCard}>
      <div className={styles.header}>
        <div className={styles.title}>{averageLastMonth}km en moyenne</div>
        <RangeDate
          startDate={startLastMonthDate}
          setStartLastMonthDate={setStartLastMonthDate}
          endDate={endLastMonthDate}
          setEndLastMonthDate={setEndLastMonthDate}
        />
      </div>
      Total des kilomètres 4 dernières semaines
      <div className={styles.graph}>
        <BarChart
          style={{
            width: "100%",
            aspectRatio: 1,
            maxWidth: 600,
            maxHeight: 330,
          }}
          responsive
          data={data}
        >
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Legend />
          <Bar
            dataKey="km"
            fill="#B6BDFC"
            barSize={18}
            radius={[15, 15, 15, 15]}
            activeBar={{
              fill: "#0B23F4",
            }}
            isAnimationActive={true}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default KmCard;
