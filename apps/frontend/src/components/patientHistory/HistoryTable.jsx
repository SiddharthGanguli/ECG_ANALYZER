import "./HistoryTable.css";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

import { getPatientHistory } from "../../services/dashboardService";

const HistoryTable = ({ searchTerm }) => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {

      const data = await getPatientHistory();

      setPatients(data);

    } catch (error) {

      console.error(error);

    }
  };

  // Search Filter
  const filteredPatients = patients.filter((patient) => {

    const patientName = (patient.patient_name || "").toLowerCase();

    const userId = patient.user_id.toString();

    const search = searchTerm.toLowerCase();

    return (
      patientName.includes(search) ||
      userId.includes(search)
    );

  });

  return (

    <div className="history-table-card">

      <table className="history-table">

        <thead>

          <tr>

            <th>User ID</th>

            <th>Patient Name</th>

            <th>Date</th>

            <th>Condition</th>

            <th>Risk</th>

            <th>Confidence</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredPatients.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#64748b",
                }}
              >
                No patient found.
              </td>

            </tr>

          ) : (

            filteredPatients.map((patient) => (

              <tr key={patient.id}>

                {/* User ID */}

                <td>{patient.user_id}</td>

                {/* Patient Name */}

                <td>{patient.patient_name || "--"}</td>

                {/* Date */}

                <td>

                  {patient.created_at
                    ? patient.created_at.split("T")[0]
                    : "--"}

                </td>

                {/* AI Prediction (Later) */}

                <td>--</td>

                <td>--</td>

                <td>--</td>

                {/* Action */}

                <td>

                  <button className="view-btn">

                    <FaEye />

                    View

                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default HistoryTable;