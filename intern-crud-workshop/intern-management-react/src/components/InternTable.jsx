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
            {internList?.map(
              ({
                internId,
                internName,
                internEmail,
                internPhone,
                internStatus,
              }) => (
                <tr>
                  <td>{internName}</td>
                  <td>{internEmail}</td>
                  <td>{internPhone}</td>
                  <td>{internStatus}</td>
                  <td>
                    <button
                      onClick={() => {
                        editInternForm({
                          internId,
                          internName,
                          internEmail,
                          internPhone,
                          internStatus,
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
