import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNewPerson}>
        <div>
          name: <input value={props.name} onChange={props.nameChange} />
        </div>
        <br />
        <div>
          number: <input value={props.number} onChange={props.numberChange} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
