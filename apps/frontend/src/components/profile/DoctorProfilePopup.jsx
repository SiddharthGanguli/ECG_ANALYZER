import "./DoctorProfilePopup.css";

const DoctorProfilePopup = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return (

    <>

      {/* Background */}

      <div
        className="profile-overlay"
        onClick={onClose}
      ></div>

      {/* Popup */}

      <div className="profile-popup">

        <div className="profile-top">

          <div className="profile-avatar-large">
            JB
          </div>

          <h2>Dr. Jeet Biswas</h2>

          <p>jeet@gmail.com</p>

        </div>

        <div className="profile-info">

          <div className="info-row">

            <span>Specialization</span>

            <strong>Cardiologist</strong>

          </div>

          <div className="info-row">

            <span>Hospital</span>

            <strong>AIIMS Delhi</strong>

          </div>

          <div className="info-row">

            <span>License</span>

            <strong>WB123456</strong>

          </div>

          <div className="info-row">

            <span>Experience</span>

            <strong>10 Years</strong>

          </div>

        </div>

        <div className="profile-buttons">

          <button className="edit-btn">

            Edit Profile

          </button>

          <button
            className="close-btn"
            onClick={onClose}
          >

            Close

          </button>

        </div>

      </div>

    </>

  );

};

export default DoctorProfilePopup;