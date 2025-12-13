   // Simple header token auth for admin endpoints
   module.exports = function(req, res, next) {
     const adminToken = process.env.ADMIN_TOKEN;
     if (!adminToken) return res.status(500).json({ error: 'Admin token not configured' });
   
     const bearer = req.headers['authorization'];
     if (!bearer) return res.status(401).json({ error: 'Unauthorized' });
   
     const parts = bearer.split(' ');
     if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Unauthorized' });
   
     const token = parts[1];
     if (token !== adminToken) return res.status(403).json({ error: 'Forbidden' });
   
     next();
   };
   
  