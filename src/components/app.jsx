import { db, ref, push, onValue, update, remove } from "../firebase/config";
import React, { useState, useEffect } from "react";
import AddMember from "./AddMember";
import AddTask from "./AddTask";
import Board from "./Board";
import TaskFilters from "./TaskFilters";

export const CATEGORIES = ["UX", "Frontend", "Backend"];

function App() {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    memberId: "",
    category: "",
    sortBy: "timestampDesc",
  });

  useEffect(() => {
    const membersRef = ref(db, "members");
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));
      setMembers(list);
    });
  }, []);

  useEffect(() => {
    const tasksRef = ref(db, "assignments");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));
      setTasks(list);
    });
  }, []);

  // Use category as parameter and property here
  const addMember = (name, category) => {
    if (!name.trim()) return;
    const newMember = {
      name: name.trim(),
      category: category,
    };
    push(ref(db, "members"), newMember);
  };

  const addTask = (content, category) => {
    if (!content.trim()) return;
    const newTask = {
      content: content.trim(),
      category,
      timestamp: new Date().toISOString(),
      status: "new",
      assignedTo: null,
    };
    push(ref(db, "assignments"), newTask);
  };

  const assignTask = (taskId, memberId) => {
    const member = members.find((m) => m.id === memberId);
    const task = tasks.find((t) => t.id === taskId);

    if (
      task &&
      task.status === "new" &&
      member &&
      member.category.toLowerCase() === task.category.toLowerCase()
    ) {
      update(ref(db, `assignments/${taskId}`), {
        assignedTo: memberId,
        status: "in progress",
      });
    }
  };

  const markAsFinished = (taskId) => {
    update(ref(db, `assignments/${taskId}`), {
      status: "finished",
    });
  };

  const deleteTask = (taskId) => {
    remove(ref(db, `assignments/${taskId}`));
  };

  function getFilteredAndSortedTasks(tasks, filters) {
    let result = [...tasks];

    if (filters.memberId) {
      result = result.filter((t) => t.assignedTo === filters.memberId);
    }
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    result.sort((a, b) => {
      if (filters.sortBy === "timestampAsc") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else if (filters.sortBy === "timestampDesc") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (filters.sortBy === "titleAsc") {
        return a.content.localeCompare(b.content);
      } else if (filters.sortBy === "titleDesc") {
        return b.content.localeCompare(a.content);
      }
      return 0;
    });

    return result;
  }

  const filteredTasks = getFilteredAndSortedTasks(tasks, filters);

  const tasksByStatus = {
    new: filteredTasks.filter((t) => t.status === "new"),
    "in progress": filteredTasks.filter((t) => t.status === "in progress"),
    finished: filteredTasks.filter((t) => t.status === "finished"),
  };

  return (
    <div className="app-container" style={{ maxWidth: 960, margin: "auto", padding: 20 }}>
      <h1 className="app-title">Strawberry Lemonade Trello</h1>

      <AddMember categories={CATEGORIES} onAddMember={addMember} />
      <AddTask categories={CATEGORIES} onAddTask={addTask} />
      <TaskFilters members={members} filters={filters} setFilters={setFilters} />

      <Board
        tasksByStatus={tasksByStatus}
        members={members}
        assignTask={assignTask}
        markAsFinished={markAsFinished}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
