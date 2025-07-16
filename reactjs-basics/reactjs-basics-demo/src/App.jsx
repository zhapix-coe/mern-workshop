import { useState } from "react";
import "./App.css";
import { Head } from "./components/Head";
import Footer from "./components/Footer";
import { AppRoutes } from "./components/AppRoutes";
import AppContext from "./components/AppContext";

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  const userData = {
    userId: 1001,
    userName: "Sridhar Kumar",
  };
  return (
    <AppContext.Provider value={userData}>
      <Head userName="Kevin" />
      <AppRoutes />
      <Footer setPageIndex={setPageIndex} />
    </AppContext.Provider>
  );
}

export default App;
