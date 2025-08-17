// InternForm.jsx
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../CourseContext'; // Import the context hook

export const InternForm = ({
  addIntern,
  editData,
  isEditMode,
  getMaxInternId,
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState("");
  const [internStream, setInternStream] = useState("");
  const [internStatus, setInternStatus] = useState("");

  const navigate = useNavigate();
  const { courses } = useCourseContext(); // Get the courses list from the context

  const handleSubmit = (event) => {
    event.preventDefault();

    const internDetail = {
      internName,
      internEmail,
      internPhone,
      internStream,
      internStatus,
    };

    if (isEditMode) {
      internDetail._id = editData._id;
    }

    addIntern(internDetail);
    clearForm();
  };

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone("");
    setInternStream("");
    setInternStatus("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

  const handleAddCourseClick = () => {
    navigate('/add-stream');
  };

  useEffect(() => {
    setInternName(editData?.name || "");
    setInternEmail(editData?.email || "");
    setInternPhone(editData?.phone || "");
    setInternStatus(editData?.status || "");
  }, [editData]);

  return (
    <section className="intern-form-section">
      <h3>Intern Form</h3>
      <form id="internForm">
        <label>
          Name:
          <input
            type="text"
            id="internName"
            value={internName}
            onChange={(event) => setInternName(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            id="internEmail"
            value={internEmail}
            onChange={(event) => setInternEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Phone:{" "}
          <input
            type="number"
            id="internPhone"
            value={internPhone}
            onChange={(event) => setInternPhone(event.target.value)}
            required
          />
        </label>

        <label>
          Stream:
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              id="internStream"
              value={internStream}
              onChange={(event) => setInternStream(event.target.value)}
              required
            >
              {/* This is the initial empty option */}
              <option value="">-- Select a Stream --</option>
              {/* Dynamically map over the courses array from the context */}
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddCourseClick}>
              Add Course
            </button>
          </div>
        </label>
        
        <label>Status:</label>
        <div className="radio-group">
          <label>
            <input
              name="internStatus"
              type="radio"
              value="Active"
              onChange={(event) => setInternStatus(event.target.value)}
              checked={internStatus === "Active"}
            />
            Active
          </label>
          <label>
            <input
              name="internStatus"
              type="radio"
              value="InActive"
              onChange={(event) => setInternStatus(event.target.value)}
              checked={internStatus === "InActive"}
            />
            InActive
          </label>
        </div>
        <div className="btn-panel">
          <button onClick={handleCancel}>Cancel</button>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
};