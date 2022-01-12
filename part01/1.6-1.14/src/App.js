import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {(props.good + props.bad) / props.total}</p>
      <p>positive {(props.good / props.total) * 100}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  );
};

export default App;
