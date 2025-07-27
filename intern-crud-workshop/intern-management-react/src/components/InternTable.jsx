export const InternTable = ({ internList, editInternForm, deleteIntern }) => {
  console.log("internList received:", internList);

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internList?.map((intern) => {
              console.log("➡️ Intern row:", intern); 
              return (
                <tr key={intern.internId}>
                  <td>{intern.internName}</td>
                  <td>{intern.internEmail}</td>
                  <td>{intern.internPhone}</td>
                  <td>{intern.internStream || intern.stream || "N/A"}</td> 
                  <td>{intern.internStatus}</td>
                  <td>
                    <button
                      onClick={() => {
                        editInternForm(intern);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteIntern(intern);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};
