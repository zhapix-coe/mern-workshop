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
              <th>Graduate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internList?.map(
              ({
                internId,
                internName,
                internEmail,
                internPhone,
                internStatus,
                gradStatus,
              }) => (
                <tr>
                  <td>{internName}</td>
                  <td>{internEmail}</td>
                  <td>{internPhone}</td>
                  <td>{internStatus}</td>
                  <td>{gradStatus}</td>
                  <td>
                    <button
                      onClick={() => {
                        editInternForm({
                          internId,
                          internName,
                          internEmail,
                          internPhone,
                          internStatus,
                          gradStatus,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteIntern({
                          internId,
                          internName,
                          internEmail,
                          internPhone,
                          internStatus,
                          gradStatus,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
