// src/Stream.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from './CourseContext'; // Import the context hook
import './App.css'; 

function Stream() {
  const [streamName, setStreamName] = useState('');
  const navigate = useNavigate();
  const { addCourse } = useCourseContext(); // Use the hook to get the addCourse function

  const handleSave = () => {
    // Make sure the stream name is not empty
    if (streamName.trim() !== '') {
      // Call the function from the context to add the new stream
      addCourse(streamName);
      
      // After saving, redirect back to the main page
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