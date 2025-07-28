// components/InternTable.jsx
export const InternTable = ({ internList, editInternForm, deleteIntern }) => {
  return (
    <section>
      <h3>Intern List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Stream</th>
            <th>Status</th>
            <th>Place</th>
            <th>Graduate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {internList.length === 0 ? (
            <tr>
              <td colSpan="8">No interns found</td>
            </tr>
          ) : (
            internList.map((intern) => (
              <tr key={intern.internId}>
                <td>{intern.internName}</td>
                <td>{intern.internEmail}</td>
                <td>{intern.internPhone}</td>
                <td>{intern.internStream}</td>
                <td>{intern.internStatus}</td>
                <td>{intern.internPlace}</td>
                <td>{intern.gradStatus === true ? "Yes" : intern.gradStatus === false ? "No" : "-"}</td>
                <td>
                  <button onClick={() => editInternForm(intern)}>Edit</button>
                  <button onClick={() => deleteIntern(intern)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};
