import "./AnalyticsSection.css";

import { useEffect, useState } from "react";

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

import { getDashboard } from "../../../services/dashboardService";

const AnalyticsSection = () => {

  const [weeklyData, setWeeklyData] = useState([]);

  const [conditionData, setConditionData] = useState([]);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data = await getDashboard();

      setWeeklyData(data.weekly);

      setConditionData(data.conditions);

    }

    catch (error) {

      console.error(error);

    }

  };

  return (

    <section className="analytics-section">

      {/* Weekly Analysis */}

      <div className="analytics-card weekly-card">

        <div className="analytics-header">

          <div>

            <h2>Weekly Analysis Volume</h2>

            <p>Normal vs Abnormal ECGs</p>

          </div>

          <button>This Week</button>

        </div>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

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
              radius={[8,8,0,0]}
            />

            <Bar
              dataKey="abnormal"
              fill="#ef4444"
              radius={[8,8,0,0]}
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

        <p>AI Prediction Distribution</p>

        <ResponsiveContainer
          width="100%"
          height={190}
        >

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

              <strong>

                {item.value}%

              </strong>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default AnalyticsSection;