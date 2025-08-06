import React from "react";

export default function InternTable({
  internList,
  editInternForm,
  deleteIntern,
  totalInterns,
  editingInternId,
}) {
  return (
    <section className="intern-table-section">
      <div
        className="intern-table-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Intern List</h2>
        <div style={{ fontWeight: "bold" }}>
          <span style={{ color: "#007bff" }}>{totalInterns}</span>
        </div>
      </div>

      {internList.length === 0 ? (
        <p>No interns found.</p>
      ) : (
        <table
          className="intern-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Stream</th>
              <th>Graduate</th>
              <th>Place</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internList.map((intern) => {
              const isEditing = intern.internId === editingInternId;

              return (
                <tr
                  key={intern.internId}
                  className={`intern-row ${isEditing ? "editing" : ""}`}
                  style={{
                    backgroundColor: isEditing ? "#e6f7ff" : "white",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <td>{intern.internId}</td>
                  <td>{intern.internName}</td>
                  <td>{intern.internEmail}</td>
                  <td>{intern.internPhone}</td>
                  <td>{intern.internStatus}</td>
                  <td>{intern.internStream}</td>
                  <td>{intern.gradStatus ? "Yes" : "No"}</td>
                  <td>{intern.internPlace}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => editInternForm(intern)}
                      className="edit-btn"
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteIntern(intern)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
