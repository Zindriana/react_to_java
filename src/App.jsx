import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetch("http://localhost:9090/hello")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Data received:', data); // Lägg till denna rad
                setMessage(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default App;
