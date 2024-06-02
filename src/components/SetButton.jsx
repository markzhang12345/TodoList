import { Button } from "antd";
import { message } from "antd";

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

export default SetButton;