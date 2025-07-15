import { useState } from "react";
import "./App.css";
import {FormSection} from './components/Form';
import { TableSection } from "./components/Table";
import { Head } from "./components/Head";
import Footer from "./components/Footer";

function App() {


  return (
    <>
      <Head userName="Kevin" />
      <main>      
       <FormSection  />
        <TableSection rootValue="RootName123" />
      </main>
      <Footer/>

    </>
  );
}


export default App;

