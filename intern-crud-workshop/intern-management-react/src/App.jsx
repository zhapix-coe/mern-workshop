import { useState,useEffect } from "react";
import "./App.css";
import { InternForm } from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
  const [internList, setInternList] = useState([]);
  const [editData, setEditData] = useState({});
  const [editId,setEditId] = useState(0);
  const [isEditMode, setEditMode] = useState(false);
  

  useEffect(() => {   
    fetchInternList();
  }, []);

  const fetchInternList = () => {
    fetch("http://localhost:3112/interns")
      .then((res) => res.json())
      .then((respData) => {        
        setInternList(respData.data);
      })
      .catch((err) => {
        console.log("Error::", err);
      });
  };


  const addInternData = (internData) => {
    fetch('http://localhost:3112/interns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(internData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User created:', data);
      fetchInternList();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };



  const editInternData = (internData) => {
    fetch(`http://localhost:3112/interns/${editId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(internData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
      fetchInternList();
    })
    .then(data => {
      console.log('User Updated:', data);
      fetchInternList();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


  const deleteInternData = (internId) => {
    fetch(`http://localhost:3112/interns/${internId}`,{method:"DELETE"})
      .then((res) => res.json())
      .then((respData) => {        
        // setInternList(respData.data);
        fetchInternList();
      })
      .catch((err) => {
        console.log("Error::", err);
      });
  };


  const editInternForm = (internData) => {
    console.log("Inside editinernform", internData);
    setEditMode(true);
    setEditData(internData);
    setEditId(internData.internId);
    // const changedInternData = {...internData, internName:internData.internName+'changed'

    }
    
    // deleteIntern(internData);
  

  const getMaxInternId = () => {
    const maxInernId = internList.reduce((acc, cur) => {
      return acc < cur.internId ? cur.internId : acc;
    }, 0);
    return maxInernId;
  };

  const addIntern = (internData) => {
    // setInternList([...internList, internData]);  
    // console.log("AddInner: ",internData);
    // console.log("Editmode:",isEditMode);    
    isEditMode? editInternData(internData):addInternData(internData);
    setEditMode(false);
  };

  const deleteIntern = (internData) => {
    // const finalInternList = internList?.filter(
    //   (curIntern) => curIntern.internId != internData.internId
    // );
    // setInternList([...finalInternList]);
    deleteInternData(internData.internId)

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
