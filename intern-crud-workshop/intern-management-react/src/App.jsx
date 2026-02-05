import { useState, useEffect } from "react";
import "./App.css";
import InternForm from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ Fetch initial dummy data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map((user, index) => ({
          internId: index + 1,
          internName: user.name,
          internEmail: user.email,
          internPhone: user.phone.replace(/\D/g, "").slice(0, 10),
          internStatus: "Active",
          internStream: "Backend",
          gradStatus: false,
          internPlace: "Unknown",
        }));
        setInternList(formatted);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  // ✅ Get next intern ID
  const getMaxInternId = () =>
    internList.reduce(
      (max, intern) => (intern.internId > max ? intern.internId : max),
      0
    );

  // ✅ Add intern (validation already handled in InternForm)
  const addIntern = (data) => {
    setInternList([...internList, data]);
  };

  // ✅ Update intern (validation already handled in InternForm)
  const updateIntern = (updated) => {
    setInternList(
      internList.map((i) => (i.internId === updated.internId ? updated : i))
    );
    setEditData({});
    setIsEditMode(false);
  };

  // ✅ Set edit mode
  const editInternForm = (data) => {
    setEditData(data);
    setIsEditMode(true);
  };

  // ✅ Delete intern
  const deleteIntern = (data) => {
    if (!window.confirm(`Are you sure you want to delete ${data.internName}?`))
      return;

    const updatedList = internList.filter((i) => i.internId !== data.internId);
    setInternList(updatedList);
    setEditData({});
    setIsEditMode(false);
  };

  return (
    <>
      <InternHeader />
      <main>
        <InternForm
          addIntern={addIntern}
          updateIntern={updateIntern}
          editData={editData}
          isEditMode={isEditMode}
          getMaxInternId={getMaxInternId}
          resetEditMode={() => {
            setEditData({});
            setIsEditMode(false);
          }}
          existingInterns={internList} // ✅ pass list for inline validation
        />

        <InternTable
          internList={internList}
          editInternForm={editInternForm}
          deleteIntern={deleteIntern}
        />

        {/* ✅ Intern count at bottom-right */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#333" }}>
            Total Interns Submitted: {internList.length}
          </span>
        </div>
      </main>
      <InternFooter />
    </>
  );
}

export default App;
