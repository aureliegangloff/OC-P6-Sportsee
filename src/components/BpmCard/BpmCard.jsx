import styles from "./BpmCard.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../utils/context/AuthContext";
import RangeDate from "../RangeDate/RangeDate";

function BpmCard({ startWeekDate, endWeekDate }) {
  const { activityUser } = useContext(AuthContext);

  const bpmAverage = activityUser.length
    ? Math.round(
        activityUser.reduce(
          (total, activity) => total + activity.heartRate.average,
          0,
        ) / activityUser.length,
      )
    : 0;

  const [startDate, setStartDate] = useState(startWeekDate);
  const [endDate, setEndDate] = useState(endWeekDate);

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
      <div className="graph">Le graphique ici</div>
    </div>
  );
}

export default BpmCard;
