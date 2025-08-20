// src/Stream.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from './CourseContext'; 
import './App.css'; 

function Stream() {
  const [streamName, setStreamName] = useState('');
  const navigate = useNavigate();
  const { addCourse } = useCourseContext(); 

  const handleSave = () => {
    if (streamName.trim() !== '') {

      addCourse(streamName);
      navigate('/'); 
    }
  };

  return (
    <div>
      <h2>Add New Stream</h2>
      <label>
        Stream Name:
        <input 
          type="text" 
          value={streamName} 
          onChange={(e) => setStreamName(e.target.value)} 
        />
      </label>
      <button onClick={handleSave}>Save Stream</button>
    </div>
  );
}

export default Stream;