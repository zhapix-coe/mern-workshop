import { useEffect, useState } from "react";

function Footer() {
  //React Hook
  const [test, setTest] = useState("Zhapix Center of Excellence");

  

console.log('Start Footer')

  useEffect(()=>{
    ///API -- fetch Bank statement () from server

    console.log('Inside useEffect')

    return ()=>{

      console.log("Inside UnMount...")
    }


  });


  return (
    <footer>
      {console.log("Inside Return")}

      <span> &copy; {test} </span>
        <button onClick={()=>{setTest("Changed Footer")}}>ChangeFooter</button>
    </footer>
  );
}

export default Footer;
