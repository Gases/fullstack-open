import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <th align="left">{props.text}</th>
        <td align="right">{props.value}%</td>
      </tr>
    );
  }

  return (
    <tr>
      <th align="left">{props.text}</th>
      <td align="right">{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  if (props.total !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="average" value={(props.good - props.bad) / props.total} />
          <StatisticLine text="positive" value={(props.good / props.total) * 100} />
        </tbody>
      </table>
    )
  }
  
  return (
    <p>No feedback given</p>
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

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  );
};

export default App;
