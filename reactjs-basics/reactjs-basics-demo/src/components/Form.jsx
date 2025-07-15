

export const FormSection = (props)=>{
  
    return (
        
         <section class="form-section">
        <h3>Form Section</h3>        
        <form>
          <label for="name">Name </label><input id="name" type="text" />
          <label forl="age">Age: </label> <input id="age" type="number" />
          <button type="submit">Submit</button>
        </form>
      </section>
        
    )
}

