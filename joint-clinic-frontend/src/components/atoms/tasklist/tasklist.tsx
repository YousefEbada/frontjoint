"use client";
import React, { useState, useEffect } from "react";
import Typography from "@/components/atoms/Typography";
import "./tasklist.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface TaskItem {
  _id?: string;
  id?: number | string; // keeping for compatibility
  title?: string; // mapped to content
  content?: string; // backend field
  category?: string; // mapped to tag
  tag?: string; // backend field
  due?: string;
  isPlaying?: boolean;
  isAdd?: boolean;
  isEditing?: boolean;
}

interface TaskListProps {
  taskItems: TaskItem[];
  onAddTask: (task: { content: string; category: string; due: string }) => void;
  onUpdateTask: (taskId: string, task: { content?: string; category?: string; due?: string }) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({
  taskItems,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}: TaskListProps) {

  // Local state for the new task being added
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; category: string; due: string }>({
    title: "",
    category: "Roles",
    due: "Due Today"
  });

  // Local state for editing existing tasks
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ title: string; category: string; due: string }>({
    title: "",
    category: "Roles",
    due: "Due Today"
  });

  const [completedIndices, setCompletedIndices] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    setCompletedIndices((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setNewTask({ title: "", category: "Roles", due: "Due Today" });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewTask({ title: "", category: "Roles", due: "Due Today" });
  };

  const handleSaveNewTask = () => {
    if (!newTask.title.trim()) return;
    onAddTask({
      content: newTask.title,
      category: newTask.category || "Roles",
      due: newTask.due || "Due Today"
    });
    setIsAdding(false);
    setNewTask({ title: "", category: "Roles", due: "Due Today" });
  };

  const handleStartEdit = (task: TaskItem) => {
    const id = task._id || String(task.id);
    setEditingId(id);
    setEditData({
      title: task.content || task.title || "",
      category: task.category || "Roles",
      due: task.due || "Due Today"
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id: string) => {
    if (!editData.title.trim()) return;
    onUpdateTask(id, {
      content: editData.title,
      category: editData.category,
      due: editData.due,
    });
    setEditingId(null);
  };

  const getDueColor = (dueText?: string) => {
    if (!dueText) return "text-[#F6A500]";
    const lower = dueText.toLowerCase();
    if (lower.includes("today")) return "text-red-600";
    if (lower.includes("tomorrow")) return "text-yellow-500";
    if (lower.includes("week") || lower.includes("oct") || lower.includes("nov") || lower.includes("dec")) return "text-green-600";
    return "text-[#F6A500]";
  };

  return (
    <div className="w-full bg-transparent flex flex-col gap-4">
      {taskItems.map((task, i) => {
        const id = task._id || String(task.id || i);
        const isCompleted = completedIndices.includes(id);
        const isEditing = editingId === id;

        // Display values (mapped by parent, so we trust them)
        const displayTitle = task.content || task.title || "";
        const displayCategory = task.category || "Roles";
        const displayDue = task.due || "Due Today";

        return (
          <div
            key={id}
            className={clsx(
              "w-full rounded-[20px] md:rounded-full bg-[#eff6ff] overflow-hidden",
              "grid grid-cols-2 md:grid-cols-6 items-center",
              "md:px-4 md:py-0 md:h-[50px] md:gap-y-0",
              "border border-none"
            )}
          >
            {/* Column 1: Checkbox & Title */}
            <div className={clsx(
              "col-span-2 md:col-span-4 flex items-center gap-3 px-4 py-3 md:p-0",
              "border-b border-blue-200 md:border-none"
            )}>
              <button
                onClick={() => toggleComplete(id)}
                className={clsx(
                  "w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center transition-all shrink-0",
                  isCompleted ? "bg-blue-500" : "bg-transparent",
                  isEditing && "opacity-50 pointer-events-none"
                )}
              >
                {isCompleted && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </button>

              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Task Brief"
                  autoFocus
                  className="w-full bg-transparent border-none focus:ring-0 text-blue-900 placeholder-blue-300 font-bold"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(id);
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                />
              ) : (
                <div onClick={() => handleStartEdit(task)} className="w-full cursor-pointer">
                  <Typography
                    text={displayTitle}
                    variant="bodyBold"
                    className={clsx(
                      "text-blue-900",
                      isCompleted && "line-through opacity-50"
                    )}
                  />
                </div>
              )}
            </div>

            {/* Column 2: Category */}
            <div className={clsx(
              "col-span-1 flex items-center justify-center relative py-3 md:py-0",
              "border-r border-blue-200 md:border-r-0"
            )}>
              <span className="taskcategoryleft md:block hidden"></span>

              {isEditing ? (
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="bg-transparent text-center text-blue-900 font-medium focus:ring-0 border-none w-full appearance-none"
                >
                  <option value="Roles">Roles</option>
                  <option value="CMS">CMS</option>
                  <option value="Video">Video</option>
                  <option value="Design">Design</option>
                </select>
              ) : (
                <Typography
                  text={displayCategory}
                  variant="bodyRegular"
                  className="text-blue-900 text-center font-medium"
                />
              )}

              <span className="taskcategoryright md:block hidden"></span>
            </div>

            {/* Column 3: Due Date & Delete */}
            <div className="col-span-1 flex items-center justify-between pl-4 pr-2 py-3 md:py-0">
              {isEditing ? (
                <div className="flex-1">
                  <select
                    value={editData.due}
                    onChange={(e) => setEditData({ ...editData, due: e.target.value })}
                    className="bg-transparent text-center text-[#F6A500] font-medium focus:ring-0 border-none w-full appearance-none"
                  >
                    <option value="Due Today">Due Today</option>
                    <option value="Due Tomorrow">Due Tomorrow</option>
                    <option value="Due Next Week">Due Next Week</option>
                  </select>
                </div>
              ) : (
                <div className="flex-1 flex justify-center">
                  <Typography
                    text={displayDue}
                    variant="bodyRegular"
                    className={clsx(
                      getDueColor(displayDue),
                      "text-center font-medium"
                    )}
                  />
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Are you sure you want to delete this task?")) {
                    onDeleteTask(id);
                  }
                }}
                className="text-red-400 hover:text-red-600 transition-colors ml-2"
              >
                <FontAwesomeIcon icon={faTrash} size="sm" />
              </button>
            </div>
          </div>
        );
      })}

      {/* New Task Row */}
      {isAdding && (
        <div
          className={clsx(
            "w-full rounded-[20px] md:rounded-full bg-[#eff6ff] overflow-hidden",
            "grid grid-cols-2 md:grid-cols-6 items-center",
            "md:px-4 md:py-0 md:h-[50px] md:gap-y-0",
            "border border-none"
          )}
        >
          {/* Title Input */}
          <div className="col-span-2 md:col-span-4 flex items-center gap-3 px-4 py-3 md:p-0 border-b border-blue-200 md:border-none">
            <div className="w-5 h-5 rounded-full border border-blue-500 opacity-50" />
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="New Task Name..."
              autoFocus
              className="w-full bg-transparent border-none focus:ring-0 text-blue-900 placeholder-blue-300 font-bold"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveNewTask();
                if (e.key === "Escape") handleCancelAdd();
              }}
            />
          </div>

          {/* Category Select */}
          <div className="col-span-1 flex items-center justify-center relative py-3 md:py-0 border-r border-blue-200 md:border-r-0">
            <span className="taskcategoryleft md:block hidden"></span>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="bg-transparent text-center text-blue-900 font-medium focus:ring-0 border-none w-full appearance-none"
            >
              <option value="Roles">Roles</option>
              <option value="CMS">CMS</option>
              <option value="Video">Video</option>
              <option value="Design">Design</option>
            </select>
            <span className="taskcategoryright md:block hidden"></span>
          </div>

          {/* Due Date Input */}
          <div className="col-span-1 flex items-center justify-center py-3 md:py-0">
            <select
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              className="bg-transparent text-center text-[#F6A500] font-medium focus:ring-0 border-none w-full appearance-none"
            >
              <option value="Due Today">Due Today</option>
              <option value="Due Tomorrow">Due Tomorrow</option>
              <option value="Due Next Week">Due Next Week</option>
            </select>
            <button onClick={handleCancelAdd} className="ml-2 text-gray-400">
              <FontAwesomeIcon icon={faPlus} className="rotate-45" />
            </button>
          </div>
        </div>
      )}

      {/* Add Task Button */}
      {!isAdding && (
        <div
          onClick={handleStartAdd}
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
      )}
    </div>
  );
}
