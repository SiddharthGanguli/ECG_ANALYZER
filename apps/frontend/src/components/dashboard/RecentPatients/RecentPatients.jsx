import "./RecentPatients.css";

import { useEffect, useState } from "react";

import { getDashboard } from "../../../services/dashboardService";

const RecentPatients = () => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data = await getDashboard();

      setPatients(data.recentPatients);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <section className="recent-patients">

      <div className="recent-header">

        <h2>Recent Patients</h2>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>

            <th>User ID</th>

            <th>Patient Name</th>

            <th>Date</th>

            <th>Condition</th>

            <th>Risk</th>

            <th>Confidence</th>

          </tr>

        </thead>

        <tbody>

          {patients.map((patient, index) => (

            <tr key={index}>

              <td>{patient.user_id}</td>

              <td>{patient.patient_name}</td>

              <td>

                {patient.created_at
                  ? patient.created_at.split("T")[0]
                  : "--"}

              </td>

              <td>

                {patient.condition}

              </td>

              <td>

                <span
                  style={{
                    color:
                      patient.risk === "High Risk"
                        ? "#dc2626"
                        : "#16a34a",
                    fontWeight: 600,
                  }}
                >

                  {patient.risk}

                </span>

              </td>

              <td>

                {patient.confidence}
                {patient.confidence !== "--" ? "%" : ""}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>

  );

};

export default RecentPatients;