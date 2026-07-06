import "./HistoryStats.css";

const HistoryStats = () => {
  return (
    <div className="history-stats">

      {/* Monthly Analysis */}

      <div className="analysis-card">

        <h3>Monthly Analysis Volume</h3>

        <p>ECG analyses performed per month</p>

        <div className="chart-area">

          <div className="chart-placeholder">

            Monthly Chart Coming Soon

          </div>

        </div>

      </div>

      {/* Risk Distribution */}

      <div className="risk-card">

        <h3>Risk Distribution</h3>

        <div className="risk-row">

          <span>High Risk</span>

          <span>0 (0%)</span>

        </div>

        <div className="progress-bar">

          <div className="high"></div>

        </div>

        <div className="risk-row">

          <span>Medium Risk</span>

          <span>0 (0%)</span>

        </div>

        <div className="progress-bar">

          <div className="medium"></div>

        </div>

        <div className="risk-row">

          <span>Low Risk</span>

          <span>0 (0%)</span>

        </div>

        <div className="progress-bar">

          <div className="low"></div>

        </div>

        <div className="risk-footer">

          <p>Total Records: <strong>0</strong></p>

          <p>This Month: <strong>0</strong></p>

        </div>

      </div>

    </div>
  );
};

export default HistoryStats;