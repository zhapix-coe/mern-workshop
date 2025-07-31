import { useEffect, useState } from "react";

export const InternForm = ({
  addIntern,
  editData,
  getMaxInternId,
}) => {
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState("");
  const [internStream, setInternStream] = useState("");
  const [internStatus, setInternStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

   if (!internStream || internStream.trim() === "") {
  alert("Please select a stream.");
  return;
}

    const maxInternId = getMaxInternId();

    const internDetail = {
      internId: maxInternId + 1,
      internName,
      internEmail,
      internPhone,
      internStream,
      internStatus
    };
    console.log("Submitted Data:", internDetail);

    addIntern(internDetail);
    clearForm();
  };

  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone("");
    setInternStream("");
    setInternStatus("")
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

useEffect(() => {
  setInternName(editData?.internName || "");
  setInternEmail(editData?.internEmail || "");
  setInternPhone(editData?.internPhone || "");
  setInternStream(editData?.internStream || "");
  setInternStatus(editData?.internStatus || "");
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
          Phone:
          <input
            type="number"
            id="internPhone"
            value={internPhone}
            onChange={(event) => setInternPhone(event.target.value)}
            required
          />
        </label>
<div>
  <label>
  Stream:
  <select
    id="internStream"
    value={internStream}
    onChange={(event) => setInternStream(event.target.value)}
    required
  >
    <option value="">-- Select Stream --</option>
    <option value="FullStack">FullStack</option>
    <option value="Automation Testing">Automation Testing</option>
  </select>
</label>
</div>

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