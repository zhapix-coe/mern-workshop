import { useEffect,useState } from "react"


export const FormSection = (props)=>{
  const [nameVal, setNameVal] = useState();

  useEffect(()=>{
    ///API -- fetch Bank statement () from server

    console.log('Inside useEffect')

    return ()=>{
      console.log("Inside UnMount...")
    }
  
},[])


useEffect(()=>{
console.log('Inside useEffect, nameVal::',nameVal);
return ()=>{

  console.log('Unmount::Inside Effect NameValue');
  
}
},[nameVal])

    return (
        
         <section class="form-section">
        <h3>{props.formTitle}</h3>        
        <form>
          <label for="name">Name </label><input id="name" value={nameVal} onChange={(event)=>{setNameVal(event.target.value)}} type="text" />
          <label forl="age">Age: </label> <input id="age" type="number" />
          <button type="submit">Submit</button>
        </form>
        <FormNote/>
      </section>
        
    )
}

const FormNote = ()=>{
  return <span>All fields are mandatory</span>
}

