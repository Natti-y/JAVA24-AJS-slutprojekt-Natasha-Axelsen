import React from "react";

function Task({ task, members, assignTask, markAsFinished, deleteTask, status }) {
  const assignedMember = members.find((m) => m.id === task.assignedTo);

  return (
    <div
      className="task"
      style={{
        backgroundColor: "white",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <strong>{task.content}</strong>
        <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          <div>
            <em>Created:</em> {task.timestamp}
          </div>
          <div>
            <em>Category:</em> {task.category || "Unknown"}
          </div>
          {assignedMember && (
            <div>
              <em>Assigned to:</em> {assignedMember.name} ({assignedMember.category})
            </div>
          )}
        </div>
      </div>

      <div style={{ marginLeft: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {status === "new" && (
          <select
            onChange={(e) => assignTask(task.id, e.target.value)}
            defaultValue=""
            aria-label={`Assign task ${task.content}`}
          >
            <option value="" disabled>
              Assign to...
            </option>
            {task.category &&
              members
                .filter(
                  (m) =>
                    (m.category?.toLowerCase() || "") === (task.category?.toLowerCase() || "")
                )
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.category})
                  </option>
                ))}
          </select>
        )}

        {status === "in progress" && (
          <button onClick={() => markAsFinished(task.id)}>Mark as Finished</button>
        )}

        {status === "finished" && (
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        )}
      </div>
    </div>
  );
}

export default Task;
