import styles from "./BpmCard.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../utils/context/AuthContext";
import RangeDate from "../RangeDate/RangeDate";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip } from "recharts";

function BpmCard({ startWeekDate, endWeekDate }) {
  const { activityUser } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(startWeekDate);
  const [endDate, setEndDate] = useState(endWeekDate);

  // Activités comprises dans la période sélectionnée
  const selectedActivities = activityUser.filter((activity) => {
    const activityDate = new Date(activity.date);
    return activityDate >= startDate && activityDate <= endDate;
  });

  // BPM moyen de la période
  const bpmAverage = selectedActivities.length
    ? Math.round(
        selectedActivities.reduce(
          (total, activity) => total + activity.heartRate.average,
          0,
        ) / selectedActivities.length,
      )
    : 0;

  // Tableau des activités par jour de la semaine
  const data = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    const dateString = date.toISOString().split("T")[0]; // date format

    const activity = activityUser.find(
      (activity) => activity.date === dateString,
    );

    return {
      day: date.toLocaleDateString("fr-FR", {
        weekday: "short",
      }),
      minBPM: activity ? activity.heartRate.min : null,
      maxBPM: activity ? activity.heartRate.max : null,
      averageBPM: activity ? activity.heartRate.average : null,
    };
  });
  return (
    <div className={styles.BpmCard}>
      <div className={styles.header}>
        <div className={styles.title}>{bpmAverage} BPM</div>
        <RangeDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
      Fréquence cardiaque moyenne
      <div className="graph">
        <ComposedChart
          style={{
            width: "100%",
            aspectRatio: 1,
            maxWidth: 600,
            maxHeight: 330,
          }}
          margin={{
            top: 10,
            right: 15,
            bottom: 0,
            left: -15,
          }}
          responsive
          data={data}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#707070",
            }}
          />
          <YAxis tickLine={false} domain={[130, 190]} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="minBPM"
            fill="#FCC1B6"
            barSize={18}
            radius={[15, 15, 15, 15]}
            activeBar={{
              fill: "#FCC1B6",
            }}
            isAnimationActive={true}
          />
          <Bar
            dataKey="maxBPM"
            fill="#F4320B"
            barSize={18}
            radius={[15, 15, 15, 15]}
            activeBar={{
              fill: "#F4320B",
            }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            connectNulls
            dataKey="averageBPM"
            stroke="#F2F3FF"
            strokeWidth={3}
            dot={{
              r: 3,
              fill: "#0b23f4",
              strokeWidth: 0,
            }}
          />
        </ComposedChart>
      </div>
      <div className="legend-graph">
        <div className="item-legend-graph min-bpm">Min BPM</div>
        <div className="item-legend-graph max-bpm">Max BPM</div>
        <div className="item-legend-graph average-bpm">Moy. BPM</div>
      </div>
    </div>
  );
}

export default BpmCard;
