import styles from "./RangeDate.module.css";
import { toLocalDateString } from "../../utils/dates";

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

  // Shift the date while preserving the format used by the parent component.
  const shiftDate = (value, amount) => {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() + amount);
    return value instanceof Date ? newDate : toLocalDateString(newDate);
  };

  return (
    <div className={styles.rangedate}>
      <button
        type="button"
        className={styles.previous}
        onClick={() => {
          setStartDate((prev) => shiftDate(prev, -rangePeriod));
          setEndDate((prev) => shiftDate(prev, -rangePeriod));
        }}
      >
        &lt;
      </button>
      {start}- {end}
      <button
        type="button"
        className={styles.next}
        onClick={() => {
          setStartDate((prev) => shiftDate(prev, rangePeriod));
          setEndDate((prev) => shiftDate(prev, rangePeriod));
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default RangeDate;
