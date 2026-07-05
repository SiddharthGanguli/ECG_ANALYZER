import "./RecentPatients.css";

const patients = [
  {
    initials: "JW",
    name: "James Whitfield",
    id: "PT-0421",
    age: "62y",
    date: "2024-06-28",
    condition: "Atrial Fibrillation",
    risk: "High",
    confidence: 94,
  },

  {
    initials: "SM",
    name: "Sophia Mercer",
    id: "PT-0420",
    age: "45y",
    date: "2024-06-27",
    condition: "Normal Sinus Rhythm",
    risk: "Low",
    confidence: 98,
  },

  {
    initials: "CV",
    name: "Carlos Vega",
    id: "PT-0419",
    age: "71y",
    date: "2024-06-27",
    condition: "ST-Elevation",
    risk: "Medium",
    confidence: 87,
  },

  {
    initials: "LH",
    name: "Linda Huang",
    id: "PT-0418",
    age: "58y",
    date: "2024-06-26",
    condition: "Normal Sinus Rhythm",
    risk: "Low",
    confidence: 96,
  },

  {
    initials: "RO",
    name: "Robert Okafor",
    id: "PT-0417",
    age: "67y",
    date: "2024-06-25",
    condition: "Ventricular Tachycardia",
    risk: "High",
    confidence: 91,
  },
];

const RecentPatients = () => {
  return (
    <section className="recent-patients">

      <div className="recent-header">

        <h2>Recent Patients</h2>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Patient</th>

            <th>Date</th>

            <th>Condition</th>

            <th>Risk</th>

            <th>Confidence</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {patients.map((patient, index) => (

            <tr key={index}>

              <td>

                <div className="patient-info">

                  <div className="avatar">

                    {patient.initials}

                  </div>

                  <div>

                    <h4>{patient.name}</h4>

                    <span>

                      {patient.id} • {patient.age}

                    </span>

                  </div>

                </div>

              </td>

              <td>{patient.date}</td>

              <td>{patient.condition}</td>

              <td>

                <span
                  className={`risk ${patient.risk.toLowerCase()}`}
                >

                  {patient.risk}

                </span>

              </td>

              <td>

                <div className="confidence">

                  <div className="progress">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${patient.confidence}%`,
                      }}
                    ></div>

                  </div>

                  <span>

                    {patient.confidence}%

                  </span>

                </div>

              </td>

              <td>

                <button className="view-btn">

                  View

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
};

export default RecentPatients;