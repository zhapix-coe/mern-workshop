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
              <th>Stream</th>
              <th>Status</th>
              <th>Graduate</th> 
              <th>Place</th>    
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Use optional chaining on internList in case it's null/undefined */}
            {internList?.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.phone}</td>
                <td>{intern.stream}</td>
                <td>{intern.status}</td>
                {/* Display 'Yes' or 'No' based on isGraduate boolean */}
                <td>{intern.isGraduate ? 'Yes' : 'No'}</td> 
                <td>{intern.place}</td> {/* Display intern's place */}
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