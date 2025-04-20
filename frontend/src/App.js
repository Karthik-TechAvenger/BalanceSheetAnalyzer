import React, { useState } from "react";
import FileUpload from "./components/fileUpload.jsx";
import SummaryCards from "./components/SummaryCards";
import DashboardChart from "./components/DashBoardsChart.jsx";
import "./App.css";
import ChatBox from "./components/ChatBox";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <h1>BalanceIQ</h1>
      <h2>Your Balance Sheet Assistant</h2>
      <FileUpload onUpload={setData} />
      {data && (
        <>
          <SummaryCards data={data} />
          <DashboardChart data={data} />
          <ChatBox context={data} />
        </>
      )}
    </div>
  );
}

export default App;
