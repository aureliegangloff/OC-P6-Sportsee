import styles from "./KmCard.module.css";
import RangeDate from "../RangeDate/RangeDate";

function KmCard() {
  const startDate = new Date().toDateString();
  const endDate = new Date().toDateString();

  return (
    <div className={styles.kmCard}>
      <div className={styles.header}>
        <div className={styles.title}>18km en moyenne</div>
        <RangeDate startDate={startDate} endDate={endDate} />
      </div>
      Total des kilomètres 4 dernières semaines
      <div className="graph">Le graphique ici</div>
    </div>
  );
}

export default KmCard;
