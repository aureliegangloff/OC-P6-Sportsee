import styles from "./KmCard.module.css";
import { useContext } from "react";
import AuthContext from "../../utils/context/AuthContext";
import RangeDate from "../RangeDate/RangeDate";

function KmCard() {
  const { activityUser } = useContext(AuthContext);

  const startDate = new Date().toDateString();
  const endDate = new Date().toDateString();
  const average = activityUser.length
    ? Math.round(
        activityUser.reduce((total, activity) => total + activity.distance, 0) /
          activityUser.length,
      )
    : 0;

  return (
    <div className={styles.kmCard}>
      <div className={styles.header}>
        <div className={styles.title}>{average}km en moyenne</div>
        <RangeDate startDate={startDate} endDate={endDate} />
      </div>
      Total des kilomètres 4 dernières semaines
      <div className="graph">Le graphique ici</div>
    </div>
  );
}

export default KmCard;
