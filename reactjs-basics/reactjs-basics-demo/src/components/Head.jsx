import { Menu } from "./Menu"


export const Head=(props)=>{

  //JSX

    return (
        <header>
        <h2>Header Section: {props.userName}</h2>
        <div style={{position:"relative"}}>

          <Menu/>
        </div>
      </header>
    )
}


const calculate = (a,b)=>{
  return a+b
}

