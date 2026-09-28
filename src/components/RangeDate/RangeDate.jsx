import styles from "./RangeDate.module.css";

function RangeDate({ startDate, endDate }) {
  return (
    <div className={styles.rangedate}>
      <button type="button" className={styles.previous}></button>
      {startDate} - {endDate}
      <button type="button" className={styles.next}></button>
    </div>
  );
}

export default RangeDate;
