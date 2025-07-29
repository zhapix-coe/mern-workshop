import { useEffect, useState } from "react";
import "../index.css"; // optional styling

const InternForm = ({
  addIntern,
  updateIntern,
  editData,
  isEditMode,
  getMaxInternId,
  resetEditMode,
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState("");
  const [internStream, setInternStream] = useState("");
  const [internStatus, setInternStatus] = useState("");
  const [internPlace, setInternPlace] = useState("");
  const [gradStatus, setGradStatus] = useState("");

  useEffect(() => {
    if (isEditMode && editData) {
      setInternName(editData.internName || "");
      setInternEmail(editData.internEmail || "");
      setInternPhone(editData.internPhone || "");
      setInternStream(editData.internStream || "");
      setInternStatus(editData.internStatus || "");
      setInternPlace(editData.internPlace || "");
      setGradStatus(editData.gradStatus ? "true" : "false");
    } else {
      clearForm();
    }
  }, [editData, isEditMode]);

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone("");
    setInternStream("");
    setInternStatus("");
    setInternPlace("");
    setGradStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !internName.trim() ||
      !internEmail.trim() ||
      !internPhone ||
      !internStream ||
      !internStatus ||
      !internPlace ||
      gradStatus === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(internEmail)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!/^\d{10}$/.test(internPhone)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    const internData = {
      internId: isEditMode ? editData.internId : getMaxInternId() + 1,
      internName: internName.trim(),
      internEmail: internEmail.trim(),
      internPhone,
      internStream,
      internStatus,
      internPlace,
      gradStatus: gradStatus === "true",
    };

    if (isEditMode) {
      updateIntern(internData);
    } else {
      addIntern(internData);
    }

    clearForm();
    resetEditMode(); // Close form
  };

  const handleCancel = () => {
    clearForm();
    resetEditMode(); // Close form
  };
  {/* New "Show Table" button */}
          <button type="button" onClick={resetEditMode} className="show-table-btn">
            Show Table
          </button>

  return (
    <section className={`intern-form-section ${isEditMode ? "editing" : ""}`}>
      <h2>{isEditMode ? "Edit Intern" : "Add Intern"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={internName}
            onChange={(e) => setInternName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={internEmail}
            onChange={(e) => setInternEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            value={internPhone}
            onChange={(e) => setInternPhone(e.target.value)}
            required
          />
        </label>

        <label>
          Stream:
          <select
            value={internStream}
            onChange={(e) => setInternStream(e.target.value)}
            required
          >
            <option value="">Select Stream</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Testing">Testing</option>
          </select>
        </label>

        <label>Status:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="status"
              value="Active"
              checked={internStatus === "Active"}
              onChange={(e) => setInternStatus(e.target.value)}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="InActive"
              checked={internStatus === "InActive"}
              onChange={(e) => setInternStatus(e.target.value)}
            />
            InActive
          </label>
        </div>

        <label>
          Place:
          <input
            type="text"
            value={internPlace}
            onChange={(e) => setInternPlace(e.target.value)}
            required
          />
        </label>

        <label>Graduate:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="graduate"
              value="true"
              checked={gradStatus === "true"}
              onChange={() => setGradStatus("true")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="graduate"
              value="false"
              checked={gradStatus === "false"}
              onChange={() => setGradStatus("false")}
            />
            No
          </label>
        </div>

        <div className="btn-panel">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
          
        </div>
      </form>
    </section>
  );
};

export default InternForm;
