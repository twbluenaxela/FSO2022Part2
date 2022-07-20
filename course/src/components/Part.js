import React from "react";

const Part = (props) => {
  return (
    <div>
      <p>{props.content}</p>
      <p>{props.amount}</p>
    </div>
  );
};

export default Part;
