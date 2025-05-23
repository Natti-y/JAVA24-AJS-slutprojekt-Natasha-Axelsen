import React, { useState } from "react";

function AddTask({ categories, onAddTask }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleAdd = () => {
    onAddTask(content, category);
    setContent("");
    setCategory(categories[0]);
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h3>Add New Task</h3>
      <label
        htmlFor="taskContentInput"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Task Content:
      </label>
      <input
        id="taskContentInput"
        placeholder="Enter task content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginRight: 10, width: 300 }}
      />
      <label
        htmlFor="taskCategorySelect"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Category:
      </label>
      <select
        id="taskCategorySelect"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

export default AddTask;
