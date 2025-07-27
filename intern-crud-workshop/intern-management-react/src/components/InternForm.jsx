import { useEffect, useState } from "react";

export const InternForm = ({
  addIntern,
  editData,
  getMaxInternId,
}) => {
  // 1. State Declarations
  // All useState hooks should be declared at the top of the component
  const [internName, setInternName] = useState("");
  const [internEmail, setInternEmail] = useState("");
  const [internPhone, setInternPhone] = useState(0);
  const [internLocation, setInternLocation] = useState("");
  const [internStatus, setInternStatus] = useState("");

  // 2. useEffect Hooks
  // Group all useEffect hooks after state declarations.
  // This useEffect populates the form when editData changes.
  useEffect(() => {
    setInternName(editData?.internName);
    setInternEmail(editData?.internEmail);
    setInternPhone(editData?.internPhone);
    // There's a potential bug here: you're setting internPhone twice.
    // It should likely be setInternLocation for the second one.
    setInternLocation(editData?.internLocation); // Corrected this line
    setInternStatus(editData?.internStatus);
  }, [editData]);

  // 3. Helper Functions / Event Handlers
  // Define functions that handle events or perform specific tasks.
  // Order them logically, e.g., clearForm might be used by handleCancel and handleSubmit.
  const clearForm = () => {
    setInternName("");
    setInternEmail("");
    setInternPhone(0);
    setInternLocation("");
    setInternStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const maxInternId = getMaxInternId();

    const internDetail = {
      internId: maxInternId + 1,
      internName,
      internEmail,
      internPhone,
      internLocation,
      internStatus,
    };
    addIntern(internDetail);
    clearForm();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

  // 4. Return Statement (JSX)
  // The JSX rendering logic always comes last in the component function.
  return (
    <section className="intern-form-section">
      {console.log("Inside Render...")} {/* Consider removing console.logs from render */}
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

        <label>
          Location:
          <input
            type="text"
            id="internLocation"
            value={internLocation}
            onChange={(event) => {
              setInternLocation(event.target.value);
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
              checked={internStatus === "Active"} // Use strict equality (===)
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
              checked={internStatus === "InActive"} // Use strict equality (===)
            />
            InActive
          </label>
        </div>
        <div className="btn-panel">
          {/* Use type="button" for cancel to prevent form submission */}
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </section>
  );
};