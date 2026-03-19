import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [enrollments, setEnrollments] = useState([]);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /**
   * READ data from backend
   */
  const fetchEnrollments = async () => {
    const res = await fetch("http://localhost:5000/enroll");
    const data = await res.json();
    setEnrollments(data);
  };

  /**
   * ADD data to backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);

    setForm({ name: "", email: "", phone: "" });
    fetchEnrollments(); // refresh list
  };

  // Load data on page load
  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <div style={{ width: "500px", margin: "40px auto" }}>
      <h2>Workshop Enrollment</h2>

      {/* ADD */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Participant Name"
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone No"
          value={form.phone}
          onChange={handleChange}
        />
        <br /><br />

        <button>Enroll</button>
      </form>

      <hr />

      {/* READ */}
      <h3>Enrolled Participants</h3>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
