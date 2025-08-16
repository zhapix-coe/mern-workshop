import { useState, useEffect } from "react";
import "./App.css";
import { InternForm } from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
    const [internList, setInternList] = useState([]);
    const [editData, setEditData] = useState({});
    const [editId, setEditId] = useState('');
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchInternList();
    }, []);

    const fetchInternList = () => {
        fetch("http://localhost:3111/users")
            .then(res => res.json())
            .then(respData => {
                setInternList(respData);
            })
            .catch(err => {
                console.log("Error::", err);
            });
    };

    const addInternData = (internData) => {
        fetch('http://localhost:3111/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(internData)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(() => fetchInternList())
        .catch(error => console.error('Error:', error));
    };

    const editInternData = (internData) => {
        fetch(`http://localhost:3111/users/${internData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(internData)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(() => fetchInternList())
        .catch(error => console.error('Error:', error));
    };

    const deleteInternData = (internId) => {
        fetch(`http://localhost:3111/users/${internId}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => fetchInternList())
            .catch(err => console.log("Error::", err));
    };

    const editInternForm = (internData) => {
        setEditMode(true);
        setEditData(internData);
        setEditId(internData._id);
    };

    const addIntern = (internData) => {
        const payload = {
            name: internData.internName,
            email: internData.internEmail,
            phone: parseInt(internData.internPhone, 10),
            status: internData.internStatus
        };
        isEditMode ? editInternData(payload) : addInternData(payload);
        setEditMode(false);
    };

    const deleteIntern = (internData) => {
        deleteInternData(internData._id);
    };

    const getMaxInternId = () => 0;

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