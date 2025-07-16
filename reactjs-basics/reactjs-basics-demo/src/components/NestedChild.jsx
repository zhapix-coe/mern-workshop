import { useContext } from "react";
import AppContext from "./AppContext";

export const NestedChild = (props) => {
  const userData = useContext(AppContext);

  return (
    <>
      <br />
      <span>
        {" "}
        Value from Root Parent is :::{" "}
        <b style={{ color: "green" }}>{props.rootValue}</b>
      </span>
      <br />
      <br />
      <div>
        <span>
          {" "}
          Value from Contextis :::{" "}
          <b style={{ color: "blue" }}>{userData.userName}</b>
        </span>
      </div>
    </>
  );
};
