import React from "react";
import Component1 from "./Component1";

const Button = () => {
  return (
    <div>
      <button>
        <span>
          <Component1 />
        </span>
        I am a button
      </button>
    </div>
  );
};

export default Button;
