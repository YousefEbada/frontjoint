"use client";
import React, { useState, useEffect } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import TaskList, { TaskItem } from "../../../components/atoms/tasklist/tasklist";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { getTasks, addTask, updateTask, removeTask } from "@/lib/api/admin.api";

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic';

const Page = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("patientName") || data.patientName; // Fallback or use a different key for admin name if available
    setFirstName(name);

    if (userId) {
      fetchTasks(userId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchTasks = async (userId: string) => {
    try {
      const res = await getTasks(userId);
      if (res.ok && res.tasks) {
        // Parse tag for metadata
        const parsedTasks = res.tasks.map((t: any) => {
          let category = "Roles";
          let due = "Due Today";
          try {
            if (t.tag) {
              const parsed = JSON.parse(t.tag);
              if (typeof parsed === 'object') {
                category = parsed.category || "Roles";
                due = parsed.due || "Due Today";
              } else {
                category = t.tag;
              }
            }
          } catch (e) {
            // If not JSON, assume it's just category
            category = t.tag || "Roles";
          }
          return { ...t, category, due };
        });
        setTasks(parsedTasks);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask: { content: string; category: string; due: string }) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    try {
      // Serialize metadata into tag
      const tag = JSON.stringify({ category: newTask.category, due: newTask.due });

      const res = await addTask(userId, newTask.content, tag);
      if (res.ok && res.task) {
        const t = res.task;
        // Manually construct the added task item for state to avoid refetching immediately if we trust the return
        // But we need to make sure we parse what we assume
        const addedTask = {
          ...t,
          category: newTask.category,
          due: newTask.due
        };
        setTasks((prev) => [...prev, addedTask]);
      } else {
        alert("Failed to add task: " + (res.message || "Unknown error"));
      }
    } catch (err: any) {
      console.error("Error adding task", err);
      // Try to alert specific error if available from axios interceptor/response
      alert("Error adding task: " + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateTask = async (taskId: string, updateData: { content?: string; category?: string; due?: string }) => {
    try {
      // We need to merge with existing data if partially updated, but `updateTask` on backend replaces or updates?
      // Usually backend update is partial. But `tag` is one string.
      // So we need to find the task first to get current category/due if not provided?
      // TaskList passes all fields or just changed ones?
      // Our TaskList passes: { content, category, due } only if provided in specific call?
      // Actually TaskList's `handleSaveEdit` passes all 3 fields from its local state `editData`.
      // So we are safe to stringify them.

      const tag = JSON.stringify({
        category: updateData.category || "Roles",
        due: updateData.due || "Due Today"
      });

      const res = await updateTask(taskId, {
        content: updateData.content,
        tag
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => {
            const currentId = t._id || String(t.id);
            if (currentId === taskId) {
              return {
                ...t,
                content: updateData.content || t.content,
                category: updateData.category || t.category,
                due: updateData.due || t.due,
                tag // Update raw tag too just in case
              };
            }
            return t;
          })
        );
      } else {
        alert("Failed to update task: " + (res.message || "Unknown error"));
      }
    } catch (err: any) {
      console.error("Error updating task", err);
      alert("Error updating task: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await removeTask(taskId);
      if (res.ok) {
        setTasks((prev) => prev.filter(t => (t._id || String(t.id)) !== taskId));
      } else {
        alert("Failed to delete task: " + res.message);
      }
    } catch (err) {
      console.error("Error deleting task", err);
    }
  }

  return (
    <>
      <DashBoardHeader nav={false} dateTime={true} />
      <DashBoardContent>
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" style={{
            color: color.secondary,
            fontWeight: "bold"
          }} />
          <Typography text={firstName} variant="heading1" style={{
            color: color.primary,
            fontWeight: "bold"
          }} />
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-4">
          <Typography text="Today’s Tasks" variant="heading2" style={{ color: "#1E5598" }} />
        </div>

        <hr className="border-t border-gray-300 w-full" />

        {/* Summary Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {loading ? (
            <div className="w-full text-center py-4">Loading tasks...</div>
          ) : (
            <TaskList
              taskItems={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </DashBoardContent>
    </>
  );
};

export default Page;