import { useState, useEffect } from "react";
import './app.css';
import InternForm from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternHeader } from "./components/InternHeader";
import { InternFooter } from "./components/InternFooter";

function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("list"); // 'list' or 'form'

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((user, index) => ({
          internId: index + 1,
          internName: user.name,
          internEmail: user.email,
          internPhone: user.phone.replace(/\D/g, "").slice(0, 10),
          internStatus: "Active",
          internStream: "Backend",
          gradStatus: true,
          internPlace: "Unknown",
        }));
        setInternList(formatted);
      })
      .catch(console.error);
  }, []);

  const getMaxInternId = () => {
    if (internList.length === 0) return 0;
    return internList.reduce(
      (max, intern) => (intern.internId > max ? intern.internId : max),
      0
    );
  };

  const addIntern = (data) => {
    const duplicate = internList.some(
      (intern) =>
        intern.internEmail.toLowerCase() === data.internEmail.toLowerCase() ||
        intern.internPhone === data.internPhone
    );
    if (duplicate) {
      alert("Duplicate email or phone number. Entry not allowed.");
      return;
    }
    setInternList([...internList, data]);
    setCurrentPage("list"); // go back to list page
  };

  const updateIntern = (data) => {
    const duplicate = internList.some(
      (intern) =>
        intern.internId !== data.internId &&
        (intern.internEmail.toLowerCase() === data.internEmail.toLowerCase() ||
          intern.internPhone === data.internPhone)
    );
    if (duplicate) {
      alert("Duplicate email or phone number exists. Update not allowed.");
      return;
    }
    setInternList(
      internList.map((i) => (i.internId === data.internId ? data : i))
    );
    setEditData({});
    setIsEditMode(false);
    setCurrentPage("list");
  };

  const editInternForm = (data) => {
    setEditData(data);
    setIsEditMode(true);
    setCurrentPage("form");
  };

  const deleteIntern = (data) => {
    setInternList(internList.filter((i) => i.internId !== data.internId));
    setEditData({});
    setIsEditMode(false);
  };

  const cancelForm = () => {
    setEditData({});
    setIsEditMode(false);
    setCurrentPage("list");
  };

  return (
    <>
      <InternHeader />
      <main style={{ padding: "20px" }}>
        {currentPage === "list" && (
          <>
            <button
              onClick={() => {
                setIsEditMode(false);
                setEditData({});
                setCurrentPage("form");
              }}
              style={{ marginBottom: "20px" }}
            >
              Add Intern
            </button>
            <InternTable 
              internList={internList}
              editInternForm={editInternForm}
              deleteIntern={deleteIntern}
            />
          </>
        )}
        {currentPage === "form" && (
  <>
    <button
      onClick={() => {
        setIsEditMode(false);
        setEditData({});
        setCurrentPage("list");  // fix here
      }}
      style={{ marginBottom: "20px" }}
    >
      Show Table
    </button>
    <InternForm
      addIntern={addIntern}
      updateIntern={updateIntern}
      editData={editData}
      isEditMode={isEditMode}
      getMaxInternId={getMaxInternId}
      resetEditMode={cancelForm}
    />
  </>
)}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }}>
          <span style={{ fontWeight: "bold", color: "#333" }}>
            Total Interns: {internList.length}
          </span>
        </div>
      </main>
      <InternFooter />
    </>
  );
}

export default App;
