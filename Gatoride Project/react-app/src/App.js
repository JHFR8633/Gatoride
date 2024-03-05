import React, {useState, useEffect} from 'react'

function App() {
    const handleButtonClick = () => {
        // Send a request to the Flask backend
        fetch('/api/button-click', {
            method: 'POST',
            // You can include any data you want to send here
            body: JSON.stringify({ action: 'button-clicked' }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend (if needed)
            console.log('Response from backend:', data);
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        });
    };

    return (
        <div className="App">
            <p>Test!</p>
            <button onClick={handleButtonClick}>Click Me!</button>
        </div>
    );
}
export default App