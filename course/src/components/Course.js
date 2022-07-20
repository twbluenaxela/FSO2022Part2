import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>{props.content}</p>
      <p>{props.amount}</p>
    </div>
  );
};

const Content = (props) => {
  console.log("Loading content props...", props.parts);
  return (
    <div>
      <Part content={props.parts[0].name} amount={props.parts[0].exercises} />
      <Part content={props.parts[1].name} amount={props.parts[1].exercises} />
      <Part content={props.parts[2].name} amount={props.parts[2].exercises} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
