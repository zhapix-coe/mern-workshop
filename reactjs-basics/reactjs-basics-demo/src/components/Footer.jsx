import { useEffect, useState } from "react";

function Footer(props) {
  //React Hook
  const [test, setTest] = useState("Zhapix Center of Excellence");
  const [count, setCount] = useState(0);
  const [show,setShow] = useState(false);

  console.log("Start Footer");
  const spanStyle = {
    color:'red',
    fontSize: 12
  }

  useEffect(() => {
    ///API -- fetch Bank statement () from server

    console.log("Inside useEffect");
    console.log("UseEffect --> count::", count);

    return () => {
      console.log("Inside UnMount...");
    };
  }, [test, count]);

  const displayMessage=() => {setShow(true)};

  return (
    <footer>
      {console.log("Inside Return")}
      {
        (show)?<span id="contentID"> &copy; {test} </span>:
        <span style={spanStyle}>Not Visible</span>
      }
      
      <button
        onClick={() => {
          setTest("Changed Footer Note");
        }}
      >
        ChangeFooter
      </button>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Change Count
      </button>
      <button onClick={displayMessage}>ShowMessage</button>      
      
    </footer>
  );
}

export default Footer;
