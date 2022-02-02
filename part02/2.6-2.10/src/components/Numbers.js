import React from "react";

const Numbers = (props) => {
  return (
    <div>
      <p>
        {props.name}, {props.number}
      </p>
    </div>
  );
};

export default Numbers;
