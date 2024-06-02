import { DatePicker } from "antd";
import { Input } from "antd";

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

export default SetBar;