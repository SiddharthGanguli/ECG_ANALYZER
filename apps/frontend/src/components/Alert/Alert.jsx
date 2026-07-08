import "./Alert.css";

const Alert = ({ type = "error", message }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      <span className="alert-icon">
        {type === "success" ? "✓" : "⚠"}
      </span>

      <p>{message}</p>
    </div>
  );
};

export default Alert;