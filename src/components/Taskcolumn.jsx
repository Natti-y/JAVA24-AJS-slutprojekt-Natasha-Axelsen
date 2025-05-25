import React, { useState } from "react";
import Task from "./task";

const statusColors = {
  new: "#fff0f6",
  "in progress": "#fff7e6",
  finished: "#e6ffed",
};

function TaskColumn({ status, tasks, members, assignTask, markAsFinished, deleteTask }) {
  const [error, setError] = useState("");

  return (
    <div
      className="column"
      style={{
        minWidth: 280,
        backgroundColor: statusColors[status],
        padding: 15,
        borderRadius: 10,
        boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
        flexShrink: 0,
      }}
    >
      <h2 className="column-title" style={{ textTransform: "capitalize", marginBottom: 15 }}>
        {status}
      </h2>

      {/* Display error message */}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {tasks.length === 0 && <p style={{ fontStyle: "italic" }}>No tasks</p>}

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          members={members}
          assignTask={assignTask}
          markAsFinished={markAsFinished}
          deleteTask={deleteTask}
          status={status}
          setError={setError} // pass error setter
        />
      ))}
    </div>
  );
}

export default TaskColumn;
