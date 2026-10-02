import styles from "./BpmCard.module.css";
import { useContext } from "react";
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

  return (
    <div className={styles.BpmCard}>
      <div className={styles.header}>
        <div className={styles.title}>{bpmAverage} BPM</div>
        <RangeDate startDate={startWeekDate} endDate={endWeekDate} />
      </div>
      Fréquence cardiaque moyenne
      <div className="graph">Le graphique ici</div>
    </div>
  );
}

export default BpmCard;
