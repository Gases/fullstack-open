import React from 'react';

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  );
};

const Parts = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
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
      Total number of exercises: {exercises.reduce((a,b) => a + b)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  };
  
  return <Course course={course} />;
}

export default App;
