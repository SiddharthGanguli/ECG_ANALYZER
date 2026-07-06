import "./RecentPatients.css";

import { useEffect, useState } from "react";

import { getRecentPatients } from "../../../services/dashboardService";

const RecentPatients = () => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {

      const data = await getRecentPatients();

      setPatients(data);

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

          {patients.map((patient) => (

            <tr key={patient.id}>

              <td>{patient.user_id}</td>

              <td>{patient.patient_name}</td>

              <td>
                {patient.created_at
                  ? patient.created_at.split("T")[0]
                  : "--"}
              </td>

              <td>--</td>

              <td>--</td>

              <td>--</td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
};

export default RecentPatients;