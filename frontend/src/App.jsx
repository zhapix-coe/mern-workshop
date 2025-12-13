   import React, { useEffect, useState } from 'react';
   import { enroll, listParticipants, adminList, adminExport } from './api';
   
   export default function App() {
     const [form, setForm] = useState({ name: '', email: '', phone: '' });
     const [participants, setParticipants] = useState([]);
     const [msg, setMsg] = useState(null);
     const [adminToken, setAdminToken] = useState('');
     const [adminMode, setAdminMode] = useState(false);
   
     useEffect(() => { load(); }, []);
   
     async function load(q = '') {
       try {
         const data = await listParticipants(q);
         setParticipants(Array.isArray(data) ? data : []);
       } catch (e) {
         console.error(e);
       }
     }
   
     async function onSubmit(e) {
       e.preventDefault();
       setMsg(null);
       try {
         const data = await enroll(form);
         if (data?.error) setMsg({ type: 'error', text: data.error });
         else {
           setMsg({ type: 'success', text: 'Enrolled successfully' });
           setForm({ name: '', email: '', phone: '' });
           load();
         }
       } catch (err) {
         setMsg({ type: 'error', text: 'Server error' });
       }
     }
   
     async function enterAdmin() {
       if (!adminToken) { alert('Enter admin token'); return; }
       try {
         const list = await adminList(adminToken);
         if (list?.error) {
           alert(list.error || 'Auth failed');
           return;
         }
         setParticipants(list);
         setAdminMode(true);
       } catch (err) {
         alert('Admin fetch failed');
       }
     }
   
     async function doExport() {
       if (!adminToken) { alert('Enter admin token'); return; }
       try {
         const blob = await adminExport(adminToken);
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = `participants_${new Date().toISOString().slice(0,10)}.csv`;
         document.body.appendChild(a); a.click(); a.remove();
         URL.revokeObjectURL(url);
       } catch (err) {
         alert('Export failed');
       }
     }
   
     return (
       <div className="container">
         <h1>IRP Workshop Enrollment</h1>
   
         <form onSubmit={onSubmit} className="card">
           <label>Name</label>
           <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
           <label>Email</label>
           <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
           <label>Phone</label>
           <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
           <div style={{ marginTop: 8 }}>
             <button type="submit">Enroll</button>
           </div>
           {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
         </form>
   
         <div className="admin card">
           <h3>Participants {adminMode ? '(admin view)' : '(public)'}</h3>
           <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
             <input placeholder="Search (client-side)" onChange={e => {
               const q = e.target.value;
               if (!q) load();
               else {
                 // local filtering
                 setParticipants(prev => prev.filter(p => (p.name||'').toLowerCase().includes(q.toLowerCase()) || (p.email||'').toLowerCase().includes(q.toLowerCase()) || (p.phone||'').toLowerCase().includes(q.toLowerCase())));
               }
             }} />
             <input placeholder="Admin token" value={adminToken} onChange={e => setAdminToken(e.target.value)} />
             <button onClick={enterAdmin}>Load Admin</button>
             <button onClick={() => { setAdminMode(false); load(); }}>Public View</button>
             <button onClick={doExport}>Export CSV</button>
           </div>
   
           <table>
             <thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
             <tbody>
               {participants.map(p => (
                 <tr key={p._id || p.id}>
                   <td>{p.name}</td>
                   <td>{p.email}</td>
                   <td>{p.phone}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   }
   
  