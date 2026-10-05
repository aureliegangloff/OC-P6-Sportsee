import styles from "./RangeDate.module.css";

function RangeDate({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  typeRange,
}) {
  const start = new Date(startDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
  const end = new Date(endDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const rangePeriod = typeRange === "month" ? 28 : 7;

  return (
    <div className={styles.rangedate}>
      <button
        type="button"
        className={styles.previous}
        onClick={() => {
          setStartDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - rangePeriod);
            return newDate;
          });
          setEndDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - rangePeriod);
            return newDate;
          });
        }}
      >
        &lt;
      </button>
      {start}- {end}
      <button
        type="button"
        className={styles.next}
        onClick={() => {
          setStartDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + rangePeriod);
            return newDate;
          });
          setEndDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + rangePeriod);
            return newDate;
          });
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default RangeDate;
