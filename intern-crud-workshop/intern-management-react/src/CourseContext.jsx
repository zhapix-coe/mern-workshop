import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};