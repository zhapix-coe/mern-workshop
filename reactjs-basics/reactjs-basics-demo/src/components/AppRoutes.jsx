import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FormSection } from "./Form";
import { TableSection } from "./Table";
import { Home } from "./Home";

export const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home/>} />
      <Route path="/form" element={<FormSection formTitle="Intern Form" />} />
      <Route path="/table" element={<TableSection rootValue="RootName123" />} />
    </Routes>
  );
};
