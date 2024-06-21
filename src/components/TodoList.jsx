import { DatePicker } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { List } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import { useReducer } from "react";
import tasksReducer from "./tasksReducer";

function SetTask() {
  const [titleText, setTitleText] = useState("");
  const [date, setDate] = useState("");
  const [taskData, dispatch] = useReducer(tasksReducer, []);
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
        dispatch={dispatch}
      />
      <TaskListTable taskData={taskData} dispatch={dispatch} />
    </>
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

function SetButton({ titleText, date, onTitleChange, onDateChange, dispatch }) {
  function handleSubmit() {
    if (!titleText || !date) {
      message.info("请输入任务名称和截止时间");
      return;
    }
    dispatch({
      type: "submit",
      title: titleText,
      date: date,
      isFinish: false,
      isInTime: date > new Date(),
    });
    onTitleChange("");
    onDateChange("");
  }

  return (
    <Button type="primary" onClick={() => handleSubmit()}>
      提交
    </Button>
  );
}

function TaskListTable({ taskData, dispatch }) {
  const handleCheckboxChange = (index) => {
    dispatch({
      type: "change",
      index: index,
    });
  };

  const onDeleteTask = (index) => {
    dispatch({
      type: "delete",
      index: index,
    });
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

function TodoList() {
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

export default TodoList;
