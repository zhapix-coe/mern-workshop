import { useState, useEffect } from "react";
// Correcting the import path for App.css
import "./App.css";
// Correcting the import paths for components based on your file structure
import { InternForm } from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
    const [internList, setInternList] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchInternList();
    }, []);

    // Fetches the list of interns from the server
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

    // Adds new intern data to the server
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

    // Edits existing intern data on the server
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

    // Deletes an intern from the server
    const deleteInternData = (internId) => {
        fetch(`http://localhost:3111/users/${internId}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => fetchInternList())
            .catch(err => console.log("Error::", err));
    };

    // Sets the form to edit mode and populates with intern data
    const editInternForm = (internData) => {
        setEditMode(true);
        setEditData(internData);
    };

    // Main function to add or edit an intern based on the mode
    const addIntern = (internData) => {
        // Create the payload object to send to the server.
        const payload = {
            name: internData.internName,
            email: internData.internEmail,
            phone: parseInt(internData.internPhone, 10),
            stream: internData.internStream,
            status: internData.internStatus
        };
        // Call the appropriate function based on the mode
        isEditMode ? editInternData(payload) : addInternData(payload);
        setEditMode(false);
    };

    // Function to handle intern deletion
    const deleteIntern = (internData) => {
        deleteInternData(internData._id);
    };

    return (
        <>
            <InternHeader />
            <main>
                <InternForm
                    addIntern={addIntern}
                    editData={editData}
                    isEditMode={isEditMode}
                />
                <InternTable internList={internList} editInternForm={editInternForm} deleteIntern={deleteIntern} />
            </main>
            <InternFooter />
        </>
    );
}

export default App;