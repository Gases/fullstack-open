import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.filterChange} />
    </div>
  );
};

export default Filter;
