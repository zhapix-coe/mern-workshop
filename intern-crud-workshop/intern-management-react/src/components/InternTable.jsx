// InternTable.jsx
import { useEffect, useState } from "react";

export const InternTable = ({ internList, editInternForm, deleteIntern }) => {
  return (
    <>
      <section className="intern-table-section">
        <h3>Intern List</h3>
        <table id="internTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internList?.map((intern) => (
              <tr key={intern._id}> {/* Use the unique MongoDB _id as the key */}
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.phone}</td>
                <td>{intern.status}</td>
                <td>
                  <button onClick={() => editInternForm(intern)}>
                    Edit
                  </button>
                  <button onClick={() => deleteIntern(intern)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};