import { useState } from "react";
import "./App.css";
import { InternForm } from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditMode, setEditMode] = useState(false);

  const editInternForm = (internData) => {
    console.log("Inside editinernform", internData);
    setEditMode(true);
    setEditData(internData);
    deleteIntern(internData);
  };

  const getMaxInternId = () => {
    const maxInernId = internList.reduce((acc, cur) => {
      return acc < cur.internId ? cur.internId : acc;
    }, 0);
    return maxInernId;
  };

  const addIntern = (internData) => {
    setInternList([...internList, internData]);    
  };

  const deleteIntern = (internData) => {
    const finalInternList = internList?.filter(
      (curIntern) => curIntern.internId != internData.internId
    );
    setInternList([...finalInternList]);
  };

  return (
    <>
      <InternHeader />
      <main>
        <InternForm
          addIntern={addIntern}
          editData={editData}
          isEditMode={isEditMode}
          getMaxInternId={getMaxInternId}
        />
        <InternTable internList={internList} editInternForm={editInternForm} deleteIntern={deleteIntern} />
      </main>
      <InternFooter />
    </>
  );
}

export default App;
