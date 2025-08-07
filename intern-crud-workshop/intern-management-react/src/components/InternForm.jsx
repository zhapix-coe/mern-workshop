import { useEffect, useState } from "react";

export const InternForm = ({
  addIntern,
  editData,
  getMaxInternId,
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState(0);
  const [internStatus, setInternStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const maxInternId = getMaxInternId();

    const internDetail = {
      // internId: maxInternId + 1,
      internName,
      internEmail,
      internPhone,
      internStatus,
    };
    addIntern(internDetail);
    clearForm();
  };

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone(0);
    setInternStatus("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

  useEffect(() => {
    setInternName(editData?.internName);
    setInternEmail(editData?.internEmail);
    setInternPhone(editData?.internPhone);
    setInternStatus(editData?.internStatus);
  }, [editData]);

  return (
    <section className="intern-form-section">
      {console.log("Inside Render...")}
      <h3>Intern Form</h3>
      <form id="internForm">
        <label>
          Name:
          <input
            type="text"
            id="internName"
            value={internName}
            onChange={(event) => {
              setInternName(event.target.value);
            }}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            id="internEmail"
            value={internEmail}
            onChange={(event) => {
              setInternEmail(event.target.value);
            }}
            required
          />
        </label>
        <label>
          Phone:{" "}
          <input
            type="number"
            id="internPhone"
            value={internPhone || ""}
            onChange={(event) => {
              setInternPhone(event.target.value);
            }}
            required
          />
        </label>

        <label>Status:</label>

        <div className="radio-group">
          <label>
            <input
              name="internStatus"
              type="radio"
              value="Active"
              onChange={(event) => {
                setInternStatus(event.target.value);
              }}
              checked={internStatus == "Active"}
            />
            Active
          </label>
          <label>
            <input
              name="internStatus"
              type="radio"
              value="InActive"
              onChange={(event) => {
                setInternStatus(event.target.value);
              }}
              checked={internStatus == "InActive"}
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
