import { useEffect, useState } from "react";

export const InternStream = ({
  addIntern,
  editData,
  isEditMode,
  getMaxInternId,
}) => {
  const [internStream, setInternStream] = useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();

    const internDetail = {
      internStream,
    };
    
    // In edit mode, add the _id
    if (isEditMode) {
      internDetail._id = editData._id;
    }

    addIntern(internDetail);
    clearForm();
  };

  const clearForm = () => {
    setInternStream("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearForm();
  };

  useEffect(() => {
    setInternStream(editData?.stream || ""); // Use 'name' from backend
  }, [editData]);

  return (
    <section className="intern-form-section">
      <h3>Intern Stream</h3>
      <form id="internForm">
        <label>
          Name:
          <input
            type="text"
            id="internStream"
            value={internStream}
            onChange={(event) => setInternStream(event.target.value)}
            required
          />
        </label>
      </form>
    </section>
  );
};