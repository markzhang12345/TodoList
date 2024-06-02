import { useState } from "react";
import SetBar from "./Setbar";
import SetButton from "./SetButton";
import TaskListTable from "./TaskListTable";

function SetTask() {
  const [titleText, setTitleText] = useState("");
  const [date, setDate] = useState("");
  const [taskData, setTaskData] = useState([]);
  return (
    <>
      <SetBar
        titleText={titleText}
        date={date}
        onTitleChange={setTitleText}
        onDateChange={setDate}
      />
      <SetButton
        titleText={titleText}
        date={date}
        onTitleChange={setTitleText}
        onDateChange={setDate}
        taskData={taskData}
        onTaskDataChange={setTaskData}
      />
      <TaskListTable taskData={taskData} onTaskDataChange={setTaskData} />
    </>
  );
}

export default SetTask;