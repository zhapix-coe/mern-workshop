import { useEffect, useState } from "react";
import "../index.css";

const InternForm = ({
  addIntern,
  updateIntern,
  editData,
  isEditMode,
  getMaxInternId,
  resetEditMode,
  existingInterns, // ✅ comes from App.js
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState("");
  const [internStream, setInternStream] = useState("");
  const [internStatus, setInternStatus] = useState("");
  const [internPlace, setInternPlace] = useState("");
  const [gradStatus, setGradStatus] = useState("");
  const [errors, setErrors] = useState({}); // ✅ store validation errors

  useEffect(() => {
    if (isEditMode && editData) {
      setInternName(editData.internName || "");
      setInternEmail(editData.internEmail || "");
      setInternPhone(editData.internPhone || "");
      setInternStream(editData.internStream || "");
      setInternStatus(editData.internStatus || "");
      setInternPlace(editData.internPlace || "");
      setGradStatus(editData.gradStatus === true ? "true" : "false");
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
    setErrors({});
  };

  const validateForm = () => {
    let newErrors = {};

    if (!internName.trim()) {
      newErrors.internName = "Name is required.";
    } else if (!/^[A-Za-z.\s]+$/.test(internName.trim())) {
      newErrors.internName = "Name can only contain letters, spaces, and dots.";
    }

    if (!internEmail.trim()) {
      newErrors.internEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(internEmail.trim())) {
      newErrors.internEmail = "Invalid email format.";
    } else if (
      existingInterns.some(
        (intern) =>
          intern.internId !== (editData?.internId || null) &&
          intern.internEmail.toLowerCase() === internEmail.trim().toLowerCase()
      )
    ) {
      newErrors.internEmail = "Duplicate email found.";
    }

    if (!internPhone.trim()) {
      newErrors.internPhone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(internPhone.trim())) {
      newErrors.internPhone = "Phone number must be 10 digits.";
    } else if (
      existingInterns.some(
        (intern) =>
          intern.internId !== (editData?.internId || null) &&
          intern.internPhone === internPhone.trim()
      )
    ) {
      newErrors.internPhone = "Duplicate phone number found.";
    }

    if (!internStatus) {
      newErrors.internStatus = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const internData = {
      internId: isEditMode ? editData.internId : getMaxInternId() + 1,
      internName: internName.trim(),
      internEmail: internEmail.trim(),
      internPhone: internPhone.trim(),
      internStream,
      internStatus,
      internPlace,
      gradStatus: gradStatus === "true",
    };

    isEditMode ? updateIntern(internData) : addIntern(internData);
    clearForm();
    resetEditMode();
  };

  const handleCancel = () => {
    clearForm();
    resetEditMode();
  };

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
          />
          {errors.internName && <p className="error">{errors.internName}</p>}
        </label>

        <label>
          Email:
          <input
            type="email"
            value={internEmail}
            onChange={(e) => setInternEmail(e.target.value)}
          />
          {errors.internEmail && <p className="error">{errors.internEmail}</p>}
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            value={internPhone}
            onChange={(e) => setInternPhone(e.target.value)}
          />
          {errors.internPhone && <p className="error">{errors.internPhone}</p>}
        </label>

        <div className="row-group">
          <div className="form-group half">
            <label>Stream:</label>
            <select
              value={internStream}
              onChange={(e) => setInternStream(e.target.value)}
              required
            >
              <option value="">Select Stream</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Automation Testing">Automation Testing</option>
            </select>
          </div>

          <div className="form-group half">
            <label className="radio-title">Graduate:</label>
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
          </div>
        </div>

        <div className="form-group">
          <label className="radio-title">Status:</label>
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
          {errors.internStatus && <p className="error">{errors.internStatus}</p>}
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
