import React from 'react';

const Header = () => {
  const course = 'Half Stack application development';
  
  return (
    <p>
      <h1>{course}</h1>
      </p>
  );
};

const Content = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises}
    </p>
  );
};

const App = () => {
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component'];
  const exercises = [10, 7, 14];
  const total = exercises.reduce((a, b) => a + b, 0);
  const content = [];  
  
  for (let i = 0; i < parts.length; i ++) {
    content.push(<Content name={parts[i]} exercises={exercises[i]} />)
  }
  
  return (
    <div>
      <Header />
      {content}
      <Total exercises={total} />
    </div>
  );
}

export default App;