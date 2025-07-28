
import { useState, useEffect } from "react";
import './app.css';
import InternForm from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";


function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ Correct useEffect with fetch
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
          internPlace: "Unknown" // ✅ Add default place
        }));
        setInternList(formatted);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  // Get next intern ID
  const getMaxInternId = () =>
    internList.reduce(
      (max, intern) => (intern.internId > max ? intern.internId : max),
      0
    );

  // Add intern with duplicate check
  const addIntern = (data) => {
    const isDuplicate = internList.some(
      (intern) =>
        intern.internEmail.toLowerCase() === data.internEmail.toLowerCase() ||
        intern.internPhone === data.internPhone
    );

    if (isDuplicate) {
      alert("Duplicate email or phone number. Entry not allowed.");
      return;
    }

    setInternList([...internList, data]);
  };

  // Update intern with duplicate check
  const updateIntern = (updated) => {
    const isDuplicate = internList.some(
      (intern) =>
        intern.internId !== updated.internId &&
        (intern.internEmail.toLowerCase() === updated.internEmail.toLowerCase() ||
          intern.internPhone === updated.internPhone)
    );

    if (isDuplicate) {
      alert("Duplicate email or phone number exists. Update not allowed.");
      return;
    }

    setInternList(
      internList.map((i) =>
        i.internId === updated.internId ? updated : i
      )
    );
    setEditData({});
    setIsEditMode(false);
  };

  const editInternForm = (data) => {
    setEditData(data);
    setIsEditMode(true);
  };

  const deleteIntern = (data) => {
    const updatedList = internList.filter(
      (i) => i.internId !== data.internId
    );
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
        />

        <InternTable
          internList={internList}
          editInternForm={editInternForm}
          deleteIntern={deleteIntern}
        />

        {/* Intern count at bottom-right only */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
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
