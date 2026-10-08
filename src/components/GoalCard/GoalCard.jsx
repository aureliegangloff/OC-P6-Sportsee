import styles from "./GoalCard.module.css";
import { PieChart, Pie, Tooltip } from "recharts";

function GoalCard({ weeklyRaces }) {
  const weeklyGoal = 6;
  const remainingRaces = weeklyGoal - weeklyRaces;
  return (
    <div className={styles.goalCard}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>X{weeklyRaces}</span> sur objectif de {weeklyGoal}
        </div>
        <p>Courses hebdomadaire réalisées</p>
      </div>
      <div className="graph graph-center">
        <PieChart
          layout="centric"
          cx="50%"
          cy="50%"
          data={[
            {
              number: weeklyRaces,
              fill: "#0B23F4",
              name: "réalisés",
            },
            {
              number: remainingRaces,
              fill: "#83a6ed",
              name: "restants",
            },
          ]}
          margin={{
            bottom: 5,
            left: 5,
            right: 5,
            top: 5,
          }}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "200px",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            dataKey="number"
            nameKey="name"
            innerRadius={35}
            outerRadius={70}
            startAngle={120}
            endAngle={-240}
            cornerRadius={3}
          >
            <Tooltip cursor={{ fill: "transparent" }} />
          </Pie>
        </PieChart>
        <div className="legend-graph">
          <div className="item-legend-graph remaining">
            {remainingRaces} restants
          </div>
          <div className="item-legend-graph realized">
            {weeklyRaces} réalisés
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
