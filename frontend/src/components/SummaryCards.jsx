import React from "react";

function SummaryCards({ data }) {
  return (
    <div className="summary-cards">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="card">
          <h4>{key.replace(/_/g, " ").toUpperCase()}</h4>
          <p>₹ {value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
