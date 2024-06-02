import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { List } from "antd";
import { Checkbox } from "antd";

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

export default TaskListTable;