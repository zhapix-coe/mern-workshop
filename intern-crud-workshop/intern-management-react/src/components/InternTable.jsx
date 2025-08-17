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
              {/* Add the new table header for Stream */}
              <th>Stream</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internList?.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.phone}</td>
                {/* Add the new table data cell for Stream */}
                <td>{intern.stream}</td>
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