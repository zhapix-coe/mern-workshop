import { useState } from "react";

function App1() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Enrollment Submitted!");
  };

  return (
    <div className="container">
      <h2>Workshop Enrollment</h2>

      <form onSubmit={handleSubmit}>        
        <input name="name" type="text" placeholder="Participant Name"  onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange}  />
        <input name="phone" type="text" placeholder="Phone No" onChange={handleChange}  />
        <button>Enroll</button>

      </form>
    </div>
  );
}

export default App;
