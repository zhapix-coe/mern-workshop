import { useEffect, useState } from "react";
import "../index.css";

export const InternForm = ({
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
  const [internStatus, setInternStatus] = useState("");

  // Fill form if in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setInternName(editData.internName || "");
      setInternEmail(editData.internEmail || "");
      setInternPhone(editData.internPhone || "");
      setInternStatus(editData.internStatus || "");
    } else {
      clearForm();
    }
  }, [editData, isEditMode]);

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone("");
    setInternStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //preventdefault

    // Validation
    const trimmedName = internName.trim();
    const trimmedEmail = internEmail.trim();

    if (!trimmedName || !trimmedEmail || !internPhone || !internStatus) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid Email.");
      return;
    }

    if (!/^\d{10}$/.test(internPhone)) {
      alert("Phone Number must be 10 digits.");
      return;
    }

    const internData = {
      internId: isEditMode ? editData.internId : getMaxInternId() + 1,
      internName: trimmedName,
      internEmail: trimmedEmail,
      internPhone,
      internStatus,
    };

    if (isEditMode) {
      updateIntern(internData);
    } else {
      addIntern(internData);
    }

    clearForm();
    resetEditMode();
  };

  return (
    <section className={`intern-form-section ${isEditMode ? "editing" : ""}`}>
      <h3>Intern Form</h3>
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
        <div className="btn-panel">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={resetEditMode} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </section>
  );
};
