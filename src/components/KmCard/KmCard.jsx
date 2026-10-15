import styles from "./KmCard.module.css";
import { useState } from "react";
import RangeDate from "../RangeDate/RangeDate";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useUserActivity } from "../../utils/Hooks/useUserActivity.js";
import { getNextSunday, toLocalDateString } from "../../utils/dates";

function KmCard() {
  const today = new Date();
  const nextSunday = getNextSunday(today);

  function getStartDate(nextSunday) {
    const startDate = new Date(nextSunday);
    startDate.setDate(startDate.getDate() - 28);
    return startDate;
  }

  const startDate = toLocalDateString(getStartDate(today));
  const endDate = toLocalDateString(nextSunday);

  // Dates pour le component RangeDate
  const [startMonthDate, setStartMonthDate] = useState(startDate);
  const [endMonthDate, setEndMonthDate] = useState(endDate);

  // get activities of the last 4 weeks
  const {
    data: FourWeeksActivities,
    loading: FourWeeksLoading,
    error: FourWeeksError,
  } = useUserActivity(startMonthDate, endMonthDate);

  // Tableau pour les 4 dernières semaines
  const weeks = Array.from({ length: 4 }, (_, weekIndex) => {
    const start = new Date(startMonthDate);
    start.setDate(start.getDate() + weekIndex * 7);

    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    return { start, end };
  });

  function calculateDistanceForWeek(week) {
    const weekActivities = FourWeeksActivities.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate >= week.start && activityDate <= week.end;
    });
    return weekActivities.reduce(
      (total, activity) => total + activity.distance,
      0,
    );
  }

  // Tableau de données pour le Chart
  const data = weeks.map((week, index) => ({
    week: `S${index + 1}`,
    km: calculateDistanceForWeek(week),
  }));

  const averageLastMonth = data.length
    ? Math.round(
        data.reduce((total, activity) => total + activity.km, 0) / data.length,
      )
    : 0;

  return (
    <div className={styles.kmCard}>
      {FourWeeksLoading && <p>Chargement en cours</p>}
      {FourWeeksError && <p>Erreur : {FourWeeksError}</p>}
      <div className={styles.header}>
        <div className={styles.title}>{averageLastMonth}km en moyenne</div>
        <RangeDate
          startDate={startMonthDate}
          setStartDate={setStartMonthDate}
          endDate={endMonthDate}
          setEndDate={setEndMonthDate}
          typeRange="month"
        />
      </div>
      Total des kilomètres 4 dernières semaines
      <div className="graph">
        <BarChart
          style={{
            width: "100%",
            aspectRatio: 1,
            maxHeight: 330,
          }}
          margin={{
            top: 10,
            right: 12,
            bottom: 0,
            left: -20,
          }}
          responsive
          data={data}
        >
          <XAxis
            dataKey="week"
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#707070",
            }}
          />
          <YAxis tickLine={false} domain={[0, 30]} />
          <Tooltip cursor={{ fill: "transparent" }} />
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
      <div className="legend-graph">
        <div className="item-legend-graph km">Km</div>
      </div>
    </div>
  );
}

export default KmCard;
