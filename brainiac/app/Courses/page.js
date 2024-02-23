'use client'
import React, { useState, useContext, createContext } from 'react';

// Create a new context
export const SelectedCourseContext = createContext();

function Page() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState(['Python', 'Java', 'Javascript','Cpp']); // Add the list of courses here

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  }

  return (
    <SelectedCourseContext.Provider value={selectedCourse}>
      <div>
        <div>Courses</div>
        <div>Selected Course: {selectedCourse}</div>
        <ul>
          {courses.map((course, index) => (
            <li key={index} onClick={() => handleCourseSelection(course)}>
              {course}
            </li>
          ))}
        </ul>
      </div>
    </SelectedCourseContext.Provider>
  )
}

export default Page;