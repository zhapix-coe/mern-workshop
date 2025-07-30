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
  const [currentPage, setCurrentPage] = useState("list");

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
          internStream: ["Frontend", "Backend", "Fullstack", "Testing"][index % 4],
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
    const duplicateEmail = internList.some(
      (intern) =>
        intern.internEmail.toLowerCase() === data.internEmail.toLowerCase()
    );

    const duplicatePhone = internList.some(
      (intern) => intern.internPhone === data.internPhone
    );

    if (duplicateEmail) {
      alert("Duplicate Email. Entry not allowed.");
      return false;
    }

    if (duplicatePhone) {
      alert("Duplicate Phone Number. Entry not allowed.");
      return false;
    }

    setInternList([...internList, data]);
    setCurrentPage("list");
    return true;
  };

  const updateIntern = (data) => {
    const duplicateEmail = internList.some(
      (intern) =>
        intern.internId !== data.internId &&
        intern.internEmail.toLowerCase() === data.internEmail.toLowerCase()
    );

    const duplicatePhone = internList.some(
      (intern) =>
        intern.internId !== data.internId &&
        intern.internPhone === data.internPhone
    );

    if (duplicateEmail) {
      alert("Duplicate Email exists. Update not allowed.");
      return false;
    }

    if (duplicatePhone) {
      alert("Duplicate Phone Number exists. Update not allowed.");
      return false;
    }

    setInternList(
      internList.map((i) => (i.internId === data.internId ? data : i))
    );
    setEditData({});
    setIsEditMode(false);
    setCurrentPage("list");
    return true;
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
              className="sticky-right"
              onClick={() => {
                setIsEditMode(false);
                setEditData({});
                setCurrentPage("form");
              }}
            >
              show Intern
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
              className="sticky-left"
              onClick={() => {
                setIsEditMode(false);
                setEditData({});
                setCurrentPage("list");
              }}
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
      </main>
      <InternFooter />
    </>
  );
}

export default App;
