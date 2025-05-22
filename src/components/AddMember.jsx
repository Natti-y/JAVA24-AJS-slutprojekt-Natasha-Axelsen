import React, { useState } from "react";

function AddMember({ roles, onAddMember }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState(roles[0]);

  const handleAdd = () => {
    onAddMember(name, role);
    setName("");
    setRole(roles[0]);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Add New Team Member</h3>
      <label
        htmlFor="memberNameInput"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Member Name:
      </label>
      <input
        id="memberNameInput"
        placeholder="Enter member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <label
        htmlFor="memberRoleSelect"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Role:
      </label>
      <select
        id="memberRoleSelect"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginRight: 10 }}
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Add Member</button>
    </div>
  );
}

export default AddMember;
