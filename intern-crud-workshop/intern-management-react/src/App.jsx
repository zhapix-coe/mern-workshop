import { useState, useEffect } from "react";
import "./app.css";
import InternForm from "./components/InternForm";
import InternTable from "./components/InternTable";
import { InternHeader } from "./components/InternHeader";
import { InternFooter } from "./components/InternFooter";

function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState("table"); // Start with table

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

  const getMaxInternId = () =>
    internList.reduce((max, intern) => Math.max(max, intern.internId), 0);

  const addIntern = (data) => {
    const duplicateEmail = internList.some(
      (intern) => intern.internEmail.toLowerCase() === data.internEmail.toLowerCase()
    );
    const duplicatePhone = internList.some(
      (intern) => intern.internPhone === data.internPhone
    );

    if (duplicateEmail || duplicatePhone) {
      setFormErrors({
        internEmail: duplicateEmail ? "Email already exists." : "",
        internPhone: duplicatePhone ? "Phone number already exists." : "",
      });
      return false;
    }

    setInternList([...internList, data]);
    setFormErrors({});
    setCurrentPage("table");
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

    if (duplicateEmail || duplicatePhone) {
      setFormErrors({
        internEmail: duplicateEmail ? "Email already exists." : "",
        internPhone: duplicatePhone ? "Phone number already exists." : "",
      });
      return false;
    }

    setInternList(
      internList.map((i) => (i.internId === data.internId ? data : i))
    );
    setEditData({});
    setIsEditMode(false);
    setFormErrors({});
    setCurrentPage("table");
    return true;
  };

  const editInternForm = (data) => {
    setEditData(data);
    setIsEditMode(true);
    setFormErrors({});
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
    setFormErrors({});
    setCurrentPage("table");
  };

  return (
    <>
      <InternHeader />

      <div className={`toggle-bar ${currentPage === "table" ? "align-right" : "align-left"}`}>
        <button
          onClick={() => {
            if (currentPage === "table") {
              setEditData({});
              setIsEditMode(false);
              setCurrentPage("form");
            } else {
              setCurrentPage("table");
            }
          }}
        >
          {currentPage === "table" ? "Show Form" : "Show Table"}
        </button>
      </div>


      {currentPage === "table" && (
        <div className="intern-table-wrapper">
          {/* Total Interns Count */}
          <div style={{ textAlign: "right", padding: "0 20px", fontWeight: "bold" }}>
            Total Interns: {internList.length}
          </div>

          <InternTable
            internList={internList}
            editInternForm={editInternForm}
            deleteIntern={deleteIntern}
          />
        </div>
      )}

      {currentPage === "form" && (
        <div className="intern-form-wrapper">
          <InternForm
            addIntern={addIntern}
            updateIntern={updateIntern}
            editData={editData}
            isEditMode={isEditMode}
            getMaxInternId={getMaxInternId}
            resetEditMode={cancelForm}
            formErrors={formErrors}
          />
        </div>
      )}

      <InternFooter />
    </>
  );
}

export default App;
