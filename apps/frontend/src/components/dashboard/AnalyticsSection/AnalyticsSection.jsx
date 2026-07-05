import "./AnalyticsSection.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", normal: 12, abnormal: 3 },
  { day: "Tue", normal: 18, abnormal: 5 },
  { day: "Wed", normal: 15, abnormal: 2 },
  { day: "Thu", normal: 21, abnormal: 6 },
  { day: "Fri", normal: 19, abnormal: 4 },
  { day: "Sat", normal: 8, abnormal: 1 },
  { day: "Sun", normal: 6, abnormal: 2 },
];

const conditionData = [
  { name: "Normal", value: 58, color: "#10b981" },
  { name: "Afib", value: 17, color: "#2563eb" },
  { name: "ST-Elev", value: 12, color: "#f59e0b" },
  { name: "VT", value: 8, color: "#ef4444" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const AnalyticsSection = () => {
  return (
    <section className="analytics-section">

      {/* Weekly Analysis */}

      <div className="analytics-card weekly-card">

        <div className="analytics-header">

          <div>

            <h2>Weekly Analysis Volume</h2>

            <p>Normal vs. Abnormal ECGs</p>

          </div>

          <button>This Week</button>

        </div>

        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={weeklyData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="normal"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="abnormal"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

        <div className="chart-legend">

          <span className="normal-dot"></span>

          Normal

          <span className="abnormal-dot"></span>

          Abnormal

        </div>

      </div>

      {/* Condition Distribution */}

      <div className="analytics-card pie-card">

        <h2>Condition Distribution</h2>

        <p>Last 30 Days</p>

        <ResponsiveContainer width="100%" height={190}>

          <PieChart>

            <Pie
              data={conditionData}
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
            >

              {conditionData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div className="condition-list">

          {conditionData.map((item, index) => (

            <div key={index}>

              <span
                className="color-dot"
                style={{
                  background: item.color,
                }}
              ></span>

              {item.name}

              <strong>{item.value}%</strong>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default AnalyticsSection;