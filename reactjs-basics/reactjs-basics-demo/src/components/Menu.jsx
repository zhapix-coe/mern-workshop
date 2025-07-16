import { Link } from 'react-router-dom';

export function Menu() {
  return (
    <nav>
      <ul>        
        <li><Link to="/">Home</Link></li>
        <li><Link to="/form">Form</Link></li>        
        <li><Link to="/table">Table</Link></li>        
      </ul>
    </nav>
  );
}
