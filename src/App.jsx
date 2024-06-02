import React from "react";
import SetTask from "./components/SetTask";

function App() {
  return (
    <div
      direction="vertical"
      style={{
        width: "30%",
        margin: "auto",
      }}
    >
      <h1 className="title">Todo List</h1>
      <SetTask />
    </div>
  );
}

export default App;
