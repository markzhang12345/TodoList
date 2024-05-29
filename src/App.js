import "./App.css";
import React from "react";
import { Button } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import { useState } from "react";
import { List } from "antd";
import { Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

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

function TaskListTable({ taskData, onTaskDataChange }) {
  const handleCheckboxChange = (index) => {
    const updatedTaskData = taskData.map((task, i) => {
      if (i === index) {
        return { ...task, isFinish: !task.isFinish };
      }
      return task;
    });
    onTaskDataChange(updatedTaskData);
  };

  const onDeleteTask = (index) => {
    const updatedTaskData = [...taskData];
    updatedTaskData.splice(index, 1);
    onTaskDataChange(updatedTaskData);
  };

  return (
    <List
      bordered
      dataSource={taskData}
      renderItem={(item, index) => (
        <List.Item>
          <p
            style={
              item.isFinish && item.isInTime
                ? { textDecoration: "line-through", color: "black" }
                : item.isFinish && !item.isInTime
                ? { textDecoration: "line-through", color: "red" }
                : !item.isFinish && item.isInTime
                ? { textDecoration: "", color: "black" }
                : { textDecoration: "", color: "red" }
            }
          >
            {item.title}
            <br />
            截止时间：{item.date.toISOString().split("T")[0]}
          </p>
          <div>
            <Checkbox
              style={{ marginLeft: "auto" }}
              onChange={() => handleCheckboxChange(index)}
            ></Checkbox>{" "}
            <Button
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => onDeleteTask(index)}
            />
          </div>
        </List.Item>
      )}
    />
  );
}

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

function SetButton({
  titleText,
  date,
  onTitleChange,
  onDateChange,
  taskData,
  onTaskDataChange,
}) {
  function handleSubmit() {
    if (!titleText || !date) {
      message.info("请输入任务名称和截止时间");
      return;
    }
    let taskDataCopy = taskData.slice();
    taskDataCopy.push({
      title: titleText,
      date: date,
      isFinish: false,
      isInTime: date > new Date(),
    });
    onTaskDataChange(taskDataCopy);
    onTitleChange("");
    onDateChange("");
  }

  return (
    <Button type="primary" onClick={() => handleSubmit()}>
      提交
    </Button>
  );
}

function SetBar({ titleText, date, onTitleChange, onDateChange }) {
  return (
    <>
      <Input
        value={titleText}
        placeholder="输入任务名称"
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <DatePicker
        value={date}
        placeholder="选择截止时间"
        onChange={(date, dateString) => onDateChange(date)}
      />
    </>
  );
}

export default App;
