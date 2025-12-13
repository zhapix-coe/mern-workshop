   export const API_BASE = 'https://bookish-space-carnival-vww754475jp2xqq5-4000.app.github.dev';
   
   // public enroll (write)
   export async function enroll(participant) {
     const res = await fetch(`${API_BASE}/api/enroll`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(participant)
     });
     return res.json();
   }
   
   // public list (read)
   export async function listParticipants(q = '') {
     const url = `${API_BASE}/api/enroll${q ? `?q=${encodeURIComponent(q)}` : ''}`;
     const res = await fetch(url);
     return res.json();
   }
   
   // admin list (protected)
   export async function adminList(token) {
     const res = await fetch(`${API_BASE}/api/admin/participants`, {
       headers: { Authorization: `Bearer ${token}` }
     });
     return res.json();
   }
   
   // admin export (returns download URL - here we'll open the URL in browser)
   export function adminExport(token) {
     const url = `${API_BASE}/api/admin/participants/export`;
     // open in new tab with Authorization header is not possible — need to fetch and download blob
     return fetch(url, {
       headers: { Authorization: `Bearer ${token}` }
     }).then(async (r) => {
       if (!r.ok) throw new Error('Export failed');
       const blob = await r.blob();
       return blob;
     });
   }
   
  