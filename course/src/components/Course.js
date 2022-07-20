import React from "react";
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = ({ courses }) => {
  console.log("Loading courses...", courses);
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name}></Header>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
