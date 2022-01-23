import React from 'react';

const Parts = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Header = (props) => {
  return (
      <h2>{props.course}</h2>
  );
};

const Content = ({ parts }) => {
  
  return (
    <div>
      {parts.map(part => 
        <Parts key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises);

  return (
    <p>
      <b>Total number of exercises: {exercises.reduce((a,b) => a + b)}</b>
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => 
        <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
};

export default Course;