export const InternTable = ({ internList, editInternForm,deleteIntern }) => {  
  
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
                <th>Location</th>
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
                  internLocation,
                  internStatus,
                }) => (
                  <tr>
                    <td>{internName}</td>
                    <td>{internEmail}</td>
                    <td>{internPhone}</td>
                    <td>{internLocation}</td>
                    <td>{internStatus}</td>
                    <td>
                      <button
                        onClick={() => {
                          editInternForm({
                            internId,
                            internName,
                            internEmail,
                            internPhone,
                            internLocation,
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
                            internLocation,
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