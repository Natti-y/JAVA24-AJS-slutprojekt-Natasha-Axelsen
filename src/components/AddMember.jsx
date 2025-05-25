import React, { useState } from "react";

function AddMember({ categories, onAddMember }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleAdd = () => {
  if (!name.trim()) return; // Förhindra tom string
  onAddMember(name, category);
  setName("");
  setCategory(categories[0]); // Återställ kategori till första alternativet
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
        htmlFor="memberCategorySelect"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Category:
      </label>
      <select
        id="memberCategorySelect"
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
      <button onClick={handleAdd}>Add Member</button>
    </div>
  );
}

export default AddMember;
