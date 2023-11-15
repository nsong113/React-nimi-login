import { useState } from "react";

const useInputValue = () => {
  //state
  const [value, setValue] = useState("");

  //handler
  const hadnler = (e) => {
    setValue(e.target.value);
  };

  return [value, hadnler];
};
export default useInputValue;
