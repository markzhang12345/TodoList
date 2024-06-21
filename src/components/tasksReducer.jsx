export default function tasksReducer(taskData, action) {
  switch (action.type) {
    case "submit": {
      return [
        ...taskData,
        {
          title: action.titleText,
          date: action.date,
          isFinish: action.isFinish,
          isInTime: action.isInTime,
        },
      ];
    }
    case "change": {
      return taskData.map((task, i) => {
        if (i === action.index) {
          return { ...task, isFinish: !task.isFinish };
        } else {
          return task;
        }
      });
    }

    case "delete": {
      const updatedTasks = taskData.filter(
        (_, index) => index !== action.index
      );
      return updatedTasks;
    }
  }
}
