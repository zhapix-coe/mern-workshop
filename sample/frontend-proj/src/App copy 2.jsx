import { useState } from "react";

function App2() {
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
/*
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5002/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };
  */

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
