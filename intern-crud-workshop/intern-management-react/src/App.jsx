import { useState, useEffect } from "react";
import "./App.css";
import { InternForm } from "./components/InternForm";
import { InternTable } from "./components/InternTable";
import { InternFooter } from "./components/InternFooter";
import { InternHeader } from "./components/InternHeader";

function App() {
    const [internList, setInternList] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditMode, setEditMode] = useState(false);
    // New state for displaying error messages
    const [errorMessage, setErrorMessage] = useState(''); 

    // Fetches the list of interns from the backend when the component mounts
    useEffect(() => {
        fetchInternList();
    }, []);

    // Function to fetch all interns
    const fetchInternList = () => {
        // Directly using the IP address and port
        fetch("http://10.10.100.85:3111/interns") 
            .then(res => {
                if (!res.ok) { // Check if response is not OK (e.g., 404, 500)
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(respData => {
                setInternList(respData);
                setErrorMessage(''); // Clear any previous error messages on successful fetch
            })
            .catch(err => {
                console.error("Error fetching intern list:", err);
                setErrorMessage(`Failed to fetch interns: ${err.message}`);
            });
    };

    // Function to add a new intern (POST request)
    const addInternData = (internData) => {
        // Directly using the IP address and port
        fetch('http://10.10.100.85:3111/interns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(internData)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(() => {g
            fetchInternList(); // Refresh list after successful add
            setErrorMessage(''); // Clear any error messages
        })
        .catch(error => {
            console.error('Error adding intern:', error);
            setErrorMessage(`Failed to add intern: ${error.message}`);
        });
    };

    // Function to edit an existing intern (PUT request)
    const editInternData = (internData) => {
        // Directly using the IP address and port
        fetch(`http://10.10.100.85:3111/interns/${internData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(internData)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(() => {
            fetchInternList(); // Refresh list after successful edit
            setErrorMessage(''); // Clear any error messages
        })
        .catch(error => {
            console.error('Error editing intern:', error);
            setErrorMessage(`Failed to edit intern: ${error.message}`);
        });
    };

    // Function to delete an intern (DELETE request)
    const deleteInternData = (internId) => {
        // Directly using the IP address and port
        fetch(`http://10.10.100.85:3111/interns/${internId}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => {
                fetchInternList(); // Refresh list after successful delete
                setErrorMessage(''); // Clear any error messages
            })
            .catch(err => {
                console.error("Error deleting intern:", err);
                setErrorMessage(`Failed to delete intern: ${err.message}`);
            });
    };

    // Sets the form to edit mode and populates it with selected intern's data
    const editInternForm = (internData) => {
        setEditMode(true);
        setEditData(internData);
        setErrorMessage(''); // Clear any error messages when starting edit
    };

    // Handles logic for adding or editing an intern based on `isEditMode`
    const addIntern = (internData) => {
        // Construct the payload with all fields, including new ones
        const payload = {
            name: internData.internName,
            email: internData.internEmail,
            phone: parseInt(internData.internPhone, 10),
            stream: internData.internStream,
            status: internData.internStatus,
            isGraduate: internData.isGraduate, // New field
            place: internData.internPlace, // New field
        };

        // If in edit mode, ensure the _id is included in the payload
        if (isEditMode) {
            payload._id = editData._id; 
            editInternData(payload);
        } else {
            addInternData(payload);
        }
        
        // Reset form and edit mode after submission
        setEditMode(false);
        setEditData({}); // Clear edit data
    };

    // Calls the delete function from the parent
    const deleteIntern = (internData) => {
        deleteInternData(internData._id);
    };

    return (
        <>
            <InternHeader />
            <main>
                {/* Display error message if present */}
                {errorMessage && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '5px', backgroundColor: '#ffe0e0' }}>
                        {errorMessage}
                    </div>
                )}
                <InternForm
                    addIntern={addIntern}
                    editData={editData}
                    isEditMode={isEditMode}
                    setErrorMessage={setErrorMessage} // Pass the error message setter to InternForm
                />
                <InternTable 
                    internList={internList} 
                    editInternForm={editInternForm} 
                    deleteIntern={deleteIntern} 
                />
            </main>
            <InternFooter />
        </>
    );
}

export default App;