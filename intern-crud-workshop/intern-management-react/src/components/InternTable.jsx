export const InternTable = ({ internList, editInternForm, deleteIntern }) => {
  return (
    <section>
      <h3>Intern List</h3>
      <h3></h3>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f4f4f4" }}>
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
              <td colSpan="8" style={{ textAlign: "center" }}>No interns found</td>
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
                <td>{intern.gradStatus === true ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => editInternForm(intern)} style={{ marginRight: "8px" }}>
                    Edit
                  </button>
                  <button onClick={() => deleteIntern(intern)} style={{ backgroundColor: "#e74c3c", color: "white" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};
