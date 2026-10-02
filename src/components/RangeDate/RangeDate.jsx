import styles from "./RangeDate.module.css";

function RangeDate({ startDate, endDate }) {
  const start = new Date(startDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
  const end = new Date(endDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
  return (
    <div className={styles.rangedate}>
      <button type="button" className={styles.previous}></button>
      {start}- {end}
      <button type="button" className={styles.next}></button>
    </div>
  );
}

export default RangeDate;
