import { useEffect, useState } from "react";
import "../index.css";

const InternForm = ({
  addIntern,
  updateIntern,
  editData,
  isEditMode,
  getMaxInternId,
  resetEditMode,
  formErrors = {},
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState("");
  const [internStream, setInternStream] = useState("");
  const [internStatus, setInternStatus] = useState("");
  const [internPlace, setInternPlace] = useState("");
  const [gradStatus, setGradStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && editData) {
      setInternName(editData.internName || "");
      setInternEmail(editData.internEmail || "");
      setInternPhone(editData.internPhone || "");
      setInternStream(editData.internStream || "");
      setInternStatus(editData.internStatus || "");
      setInternPlace(editData.internPlace || "");
      setGradStatus(editData.gradStatus ?? null);
    } else {
      clearForm();
    }
    setErrors({});
  }, [editData, isEditMode]);

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone("");
    setInternStream("");
    setInternStatus("");
    setInternPlace("");
    setGradStatus(null);
    setErrors({});
  };

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (formErrors[field]) {
      formErrors[field] = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!internName.trim()) {
  newErrors.internName = "Name is required.";
}

if (!internEmail.trim()) {
  newErrors.internEmail = "Email is required.";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(internEmail)) {
  newErrors.internEmail = "Invalid email format.";
}

if (!internPhone) {
  newErrors.internPhone = "Phone number is required.";
} else if (!/^\d{10}$/.test(internPhone)) {
  newErrors.internPhone = "Phone number must be 10 digits.";
}

if (!internStream) {
  newErrors.internStream = "Stream is required.";
}

if (gradStatus === null) {
  newErrors.gradStatus = "Graduate status is required.";
}

if (!internStatus) {
  newErrors.internStatus = "Status is required.";
}

if (!internPlace.trim()) {
  newErrors.internPlace = "Place is required.";
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
      internPhone,
      internStream,
      internStatus,
      internPlace: internPlace.trim(),
      gradStatus,
    };

    const success = isEditMode ? updateIntern(internData) : addIntern(internData);
    if (success) {
      clearForm();
      resetEditMode();
    }
  };

  const handleCancel = () => {
    clearForm();
    if (isEditMode) {
      resetEditMode();
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setInternEmail(value);
    clearFieldError("internEmail");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Digits only
    if (value.length <= 10) {
      setInternPhone(value);
      clearFieldError("internPhone");
    }
  };

  const combinedErrors = { ...errors, ...formErrors };

  return (
    <section className="intern-form-section">
      <h2>{isEditMode ? "Edit Intern" : "Add Intern"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name:
          <input
            type="text"
            value={internName}
            onChange={(e) => {
              setInternName(e.target.value);
              clearFieldError("internName");
            }}
            placeholder="Enter name"
          />
          {combinedErrors.internName && <div className="error-text">{combinedErrors.internName}</div>}
        </label>

        <label>
          Email:
          <input
            type="email"
            value={internEmail}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
          {combinedErrors.internEmail && <div className="error-text">{combinedErrors.internEmail}</div>}
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            value={internPhone}
            onChange={handlePhoneChange}
            placeholder="Enter Phone number"
            maxLength={10}
          />
          {combinedErrors.internPhone && <div className="error-text">{combinedErrors.internPhone}</div>}
        </label>

        <label>
          Stream:
          <select
            value={internStream}
            onChange={(e) => {
              setInternStream(e.target.value);
              clearFieldError("internStream");
            }}
          >
            <option value="">Select</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Testing">Testing</option>
          </select>
          {combinedErrors.internStream && <div className="error-text">{combinedErrors.internStream}</div>}
        </label>

        <div className="radio-group">
          <label>Graduate:</label>
          <label>
            <input
              type="radio"
              name="graduate"
              checked={gradStatus === true}
              onChange={() => {
                setGradStatus(true);
                clearFieldError("gradStatus");
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="graduate"
              checked={gradStatus === false}
              onChange={() => {
                setGradStatus(false);
                clearFieldError("gradStatus");
              }}
            />
            No
          </label>
          {combinedErrors.gradStatus && <div className="error-text">{combinedErrors.gradStatus}</div>}
        </div>

        <div className="radio-group">
          <label>Status:</label>
          <label>
            <input
              type="radio"
              name="status"
              value="Active"
              checked={internStatus === "Active"}
              onChange={(e) => {
                setInternStatus(e.target.value);
                clearFieldError("internStatus");
              }}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="InActive"
              checked={internStatus === "InActive"}
              onChange={(e) => {
                setInternStatus(e.target.value);
                clearFieldError("internStatus");
              }}
            />
            InActive
          </label>
          {combinedErrors.internStatus && <div className="error-text">{combinedErrors.internStatus}</div>}
        </div>

        <label>
          Place:
          <input
            type="text"
            value={internPlace}
            onChange={(e) => {
              setInternPlace(e.target.value);
              clearFieldError("internPlace");
            }}
            placeholder="Enter place"
          />
          {combinedErrors.internPlace && <div className="error-text">{combinedErrors.internPlace}</div>}
        </label>

        <div className="btn-panel">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>

      </form>
    </section>
  );
};

export default InternForm;
