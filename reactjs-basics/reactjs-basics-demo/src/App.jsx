import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FormSection } from "./components/Form";
import { TableSection } from "./components/Table";
import { Head } from "./components/Head";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Head/>
      <main>


        <FormSection internName="Surendar Kumar" />
        <TableSection />
      </main>
      <Footer/>

    </>
  );
}

export default App;
