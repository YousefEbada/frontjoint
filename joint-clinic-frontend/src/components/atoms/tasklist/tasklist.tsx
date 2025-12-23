"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import "./tasklist.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface TaskItem {
  id?: number | string;
  title: string;
  category?: string;
  due?: string;
  // dueColor removed
  // categoryColor removed (unused in logic, kept in interface previously but logic wasn't fully utilizing it either, cleaning up)
  textSize?: string;
  isAdd?: boolean; // Kept for type compatibility but filtered out
  isEditing?: boolean; // New state for inline editing
  type?: string;
  count?: number;
  major?: string;
}

interface TaskListProps {
  taskItems: TaskItem[];
  // onAddTask removed as it is handled internally
}

export default function TaskList({ taskItems: initialTaskItems }: TaskListProps) {
  // Filter out the dummy logic if present, though we will clean parent too
  const [tasks, setTasks] = useState<TaskItem[]>(
    initialTaskItems.filter((t) => !t.isAdd)
  );
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  const toggleComplete = (index: number) => {
    setCompletedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleAddTask = () => {
    const newTask: TaskItem = {
      title: "",
      category: "",
      due: "",
      isEditing: true,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (index: number, field: keyof TaskItem, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const handleSaveTask = (index: number) => {
    const updatedTasks = [...tasks];
    // If empty title, maybe remove? Or just keep editing. 
    // For now, assuming user will fill it.
    if (!updatedTasks[index].title.trim()) return;

    // Set defaults if empty
    if (!updatedTasks[index].category) updatedTasks[index].category = "Roles";
    if (!updatedTasks[index].due) updatedTasks[index].due = "Due Today";

    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
  };

  const getDueColor = (dueText?: string) => {
    if (!dueText) return "text-[#F6A500]"; // Default
    const lower = dueText.toLowerCase();
    if (lower.includes("today")) return "text-red-600";
    if (lower.includes("tomorrow")) return "text-yellow-500";
    if (lower.includes("week") || lower.includes("oct") || lower.includes("nov") || lower.includes("dec")) return "text-green-600";
    return "text-[#F6A500]";
  };

  return (
    <div className="w-full bg-transparent flex flex-col gap-4">
      {tasks.map((task, i) => {
        const isCompleted = completedIndices.includes(i);
        const isEditing = task.isEditing;

        return (
          <div
            key={i}
            className={clsx(
              "w-full rounded-[20px] md:rounded-full bg-[#eff6ff] overflow-hidden",
              "grid grid-cols-2 md:grid-cols-6 items-center",
              // Desktop padding/layout
              "md:px-4 md:py-0 md:h-[50px] md:gap-y-0",
              // Mobile padding is internal to cells now due to borders
              "border border-none"
            )}
          >
            {/* Column 1: Checkbox & Title */}
            <div className={clsx(
              "col-span-2 md:col-span-4 flex items-center gap-3 px-4 py-3 md:p-0",
              "border-b border-blue-200 md:border-none" // Horizontal line on mobile
            )}>
              <button
                onClick={() => toggleComplete(i)}
                className={clsx(
                  "w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center transition-all shrink-0",
                  isCompleted ? "bg-blue-500" : "bg-transparent",
                  isEditing && "opacity-50 pointer-events-none" // Disable check when editing
                )}
              >
                {isCompleted && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </button>

              {isEditing ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleUpdateTask(i, "title", e.target.value)}
                  placeholder="Task Brief"
                  autoFocus
                  className="w-full bg-transparent border-none focus:ring-0 text-blue-900 placeholder-blue-300 font-bold"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTask(i);
                  }}
                />
              ) : (
                <Typography
                  text={task.title}
                  variant="bodyBold"
                  className={clsx(
                    "text-blue-900",
                    isCompleted && "line-through opacity-50"
                  )}
                />
              )}
            </div>

            {/* Column 2: Category (Left on mobile, Middle on desktop) */}
            <div className={clsx(
              "col-span-1 flex items-center justify-center relative py-3 md:py-0",
              "border-r border-blue-200 md:border-r-0" // Vertical line on mobile
            )}>
              <span className="taskcategoryleft md:block hidden"></span>

              {isEditing ? (
                <select
                  value={task.category}
                  onChange={(e) => handleUpdateTask(i, 'category', e.target.value)}
                  className="bg-transparent text-center text-blue-900 font-medium focus:ring-0 border-none w-full appearance-none"
                >
                  <option value="" disabled>Task Type</option>
                  <option value="Roles">Roles</option>
                  <option value="CMS">CMS</option>
                  <option value="Video">Video</option>
                  <option value="Design">Design</option>
                </select>
              ) : (
                <Typography
                  text={task.category || ""}
                  variant="bodyRegular"
                  className="text-blue-900 text-center font-medium"
                />
              )}

              <span className="taskcategoryright md:block hidden"></span>
            </div>

            {/* Column 3: Due Date (Right on mobile, Right on desktop) */}
            <div className="col-span-1 flex items-center justify-center py-3 md:py-0">
              {isEditing ? (
                <select
                  value={task.due}
                  onChange={(e) => handleUpdateTask(i, 'due', e.target.value)}
                  className="bg-transparent text-center text-[#F6A500] font-medium focus:ring-0 border-none w-full appearance-none"
                >
                  <option value="" disabled>Due Date</option>
                  <option value="Due Today">Due Today</option>
                  <option value="Due Tomorrow">Due Tomorrow</option>
                  <option value="Due Next Week">Due Next Week</option>
                </select>
              ) : (
                <Typography
                  text={task.due || ""}
                  variant="bodyRegular"
                  className={clsx(
                    getDueColor(task.due),
                    "text-center font-medium"
                  )}
                />
              )}
            </div>

            {/* Save Button for Mobile/Desktop explicit action if needed, or stick to Enter/Blur */}
            {/* For now keeping it cleaner as requested "shape" implies simple looks. 
                Enter key saves it. 
             */}
          </div>
        );
      })}

      {/* Add Task Button */}
      <div
        onClick={handleAddTask}
        className="flex items-center justify-start w-full min-h-[50px] px-4 rounded-full bg-[#eff6ff] cursor-pointer hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center text-blue-900 font-medium gap-2">
          <FontAwesomeIcon icon={faPlus} />
          <Typography
            text="Add a new Task"
            variant="bodyBold"
            className="text-blue-900"
          />
        </div>
      </div>
    </div>
  );
}
