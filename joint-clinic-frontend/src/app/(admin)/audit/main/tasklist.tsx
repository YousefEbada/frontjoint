import "./tasklist.css"

interface TaskItem {
  title: string;
  category?: string;
  due?: string;
  dueColor?: string;
  isAdd?: boolean;
}

interface TaskListProps {
  taskItems: TaskItem[];
}

export default function TaskList({ taskItems }: TaskListProps) {
  return (
    <div className="w-full bg-transparent">
      {taskItems.map((task, i) => (
        <div
          key={i}
          className={`
            flex items-center justify-between 
            w-full h-[50px] px-4 rounded-full mb-2 bg-[#eff6ff]           
          `}
        >
          {/* Left: Checkbox + Title */}
          <div className="flex items-center gap-3">
            {/* Circle Checkbox */}
            <div
              className={`
                w-4 h-4 rounded-full border border-blue-500
              `}
            ></div>

            {/* Title */}
            <span
              className={`text-blue-900 font-medium ${
                task.isAdd ? "text-blue-700" : ""
              }`}
            >
              {task.title}
            </span>
          </div>

          {/* Right Section (Category + Due) */}
          {!task.isAdd && (
            <div className="flex items-center gap-8 text-sm w-[25%]">
              <div className="taskcategory flex items-center justify-center bg-red-500 gap-8 text-sm w-[50%]">
                <span className="text-blue-900 font-medium text-[24px] text-center">{task.category}</span>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm w-[50%]">
                <span className={`${task.dueColor} font-medium text-[24px] text-center`}>{task.due}</span>
              </div>
            </div>
          )}

          {/* Add New Task Row */}
          {task.isAdd && (
            <div className="flex items-center text-blue-700 font-medium">
              <span className="text-xl mr-2">+</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
