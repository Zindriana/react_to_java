import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [dieValue, setDieValue] = useState(0);
    const [amountOfDiceInput, setAmountOfDiceInput] = useState(1);


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

    function rollDie() {
        fetch(`http://localhost:9090/rolldie?amount=${amountOfDiceInput}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                setDieValue(Number(data));
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="App">
            <h1>{message}</h1>
            <h2>Die Roll = {dieValue}</h2>
            <input className="amountOfDiceInput" type="number" placeholder="1" min="1"
                   onChange={(event) => setAmountOfDiceInput(Number(event.target.value))}/>
            <button className="rollDieButton" onClick={rollDie}>Roll die</button>
        </div>
    );
}

export default App;
