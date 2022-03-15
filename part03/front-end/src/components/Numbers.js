import React from "react";

const Numbers = (props) => {
  return (
    <div>
      {props.name}, {props.number}
      <button onClick={props.deletePerson}>delete</button>
    </div>
  );
};

export default Numbers;
