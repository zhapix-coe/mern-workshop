import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../CourseContext'; // Import the context hook

export const InternForm = ({
    addIntern,
    editData,
    isEditMode,
    setErrorMessage, // Prop to set error messages in App.jsx
}) => {
    const [internName, setInternName] = useState("");
    const [internEmail, setInternEmail] = useState("");
    const [internPhone, setInternPhone] = useState("");
    const [internStream, setInternStream] = useState("");
    const [internStatus, setInternStatus] = useState("");
    // New state for Graduate status, using a string to represent 'yes' or 'no' from radio buttons
    const [isGraduate, setIsGraduate] = useState(''); 
    const [internPlace, setInternPlace] = useState(""); // State for Intern Place

    const navigate = useNavigate();
    const { courses } = useCourseContext(); 

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Function to validate phone number format (exactly 10 digits)
    const validatePhone = (phone) => {
        const re = /^\d{10}$/; 
        return re.test(String(phone));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Clear any previous error messages before new validation
        setErrorMessage(''); 

        // Validate Email
        if (!validateEmail(internEmail)) {
            setErrorMessage("Error: Please enter a valid email address.");
            return; // Stop submission
        }

        // Validate Phone Number
        if (internPhone && !validatePhone(internPhone)) {
            setErrorMessage("Error: Please enter a valid 10-digit phone number.");
            return; // Stop submission
        }

        // Validate Graduate status selection
        if (isGraduate === '') {
            setErrorMessage("Error: Please select if the intern is a Graduate (Yes/No).");
            return; // Stop submission
        }

        const internDetail = {
            internName,
            internEmail,
            internPhone,
            internStream,
            internStatus,
            // Convert 'yes'/'no' string from radio buttons to boolean for backend
            isGraduate: isGraduate === 'yes' ? true : false, 
            internPlace, 
        };
        
        addIntern(internDetail);
        clearForm();
    };

    // Clears all form fields and error messages
    const clearForm = () => {
        setInternName("");
        setInternEmail("");
        setInternPhone("");
        setInternStream("");
        setInternStatus("");
        setIsGraduate(''); // Clear new field
        setInternPlace(""); // Clear new field
        setErrorMessage(''); // Clear error messages
    };

    // Handles the cancel button click
    const handleCancel = (event) => {
        event.preventDefault();
        clearForm();
    };

    // Navigates to the add-stream page
    const handleAddCourseClick = () => {
        navigate('/add-stream');
    };

    // Populates form fields when in edit mode or when editData changes
    useEffect(() => {
        setInternName(editData?.name || "");
        setInternEmail(editData?.email || "");
        setInternPhone(editData?.phone || "");
        setInternStream(editData?.stream || ""); 
        setInternStatus(editData?.status || "");
        // Populate graduate status based on boolean from editData
        setIsGraduate(editData?.isGraduate === true ? 'yes' : editData?.isGraduate === false ? 'no' : ''); 
        setInternPlace(editData?.place || ""); 
    }, [editData]); 

    return (
        <section className="intern-form-section">
            <h3>Intern Form</h3>
            <form id="internForm">
                <label>
                    Name:
                    <input
                        type="text"
                        id="internName"
                        value={internName}
                        onChange={(event) => setInternName(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text" 
                        id="internEmail"
                        value={internEmail}
                        onChange={(event) => setInternEmail(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Phone:{" "}
                    <input
                        type="text" 
                        id="internPhone"
                        value={internPhone}
                        onChange={(event) => setInternPhone(event.target.value)}
                        maxLength="10" 
                        pattern="\d{10}" 
                        title="Phone number must be exactly 10 digits" 
                        required
                    />
                </label>

                <label>
                    Stream:
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                            id="internStream"
                            value={internStream}
                            onChange={(event) => setInternStream(event.target.value)}
                            required
                        >
                            <option value="">-- Select a Stream --</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddCourseClick}>
                            Add Course
                        </button>
                    </div>
                </label>

                {/* Graduate Status with radio buttons */}
                <label>Graduate:</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="isGraduate" // Name attribute groups radio buttons
                            value="yes"
                            checked={isGraduate === 'yes'}
                            onChange={(event) => setIsGraduate(event.target.value)}
                            required // Make selection mandatory
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isGraduate"
                            value="no"
                            checked={isGraduate === 'no'}
                            onChange={(event) => setIsGraduate(event.target.value)}
                        />
                        No
                    </label>
                </div>

                {/* Input for Place (after Graduate) */}
                <label>
                    Place:
                    <input
                        type="text"
                        id="internPlace"
                        value={internPlace}
                        onChange={(event) => setInternPlace(event.target.value)}
                        required
                    />
                </label>
                
                <label>Status:</label>
                <div className="radio-group">
                    <label>
                        <input
                            name="internStatus"
                            type="radio"
                            value="Active"
                            onChange={(event) => setInternStatus(event.target.value)}
                            checked={internStatus === "Active"}
                        />
                        Active
                    </label>
                    <label>
                        <input
                            name="internStatus"
                            type="radio"
                            value="InActive"
                            onChange={(event) => setInternStatus(event.target.value)}
                            checked={internStatus === "InActive"}
                        />
                        InActive
                    </label>
                </div>
                <div className="btn-panel">
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};
