import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [dieValue, setDieValue] = useState(0);
    const [amountOfDiceInput, setAmountOfDiceInput] = useState(1);
    const [newCharacterName, setNewCharacterName] = useState('');
    const [newMental, setNewMental] = useState('');
    const [newPhysical, setNewPhysical] = useState('');
    const [newSocial, setNewSocial] = useState('');
    const [newSpirit, setNewSpirit] = useState('');


    useEffect(() => {
        fetch("http://localhost:9090/hello")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
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

    function createCharacter(){
        fetch('http://localhost:9090/newcharacter', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newCharacterName,
                mental: newMental,
                physical: newPhysical,
                social: newSocial,
                spirit: newSpirit,
            }),
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="App">
            <h1>{message}</h1>
            <h2>Die Roll = {dieValue}</h2>
            <input className="amountOfDiceInput" type="number" placeholder="1" min="1"
                   onChange={(event) => setAmountOfDiceInput(Number(event.target.value))}/>
            <button className="rollDieButton" onClick={rollDie}>Roll die</button>
            <br/>
            <h3>Create a new character</h3>
            <h4>Character name</h4>
            <input className="newCharacterName" type="text" placeholder="Name"
            onChange={(event) => setNewCharacterName(event.target.value)}/>
            <h4>Character mental value</h4>
            <input className="newMentalValue" type="number" placeholder="1" min="1"
            onChange={(event) => setNewMental(event.target.value)}/>
            <h4>Character physical value</h4>
            <input className="newPhysicalValue" type="number" placeholder="1" min="1"
            onChange={(event) => setNewPhysical(event.target.value)}/>
            <h4>Character social value</h4>
            <input className="newSocialValue" type="number" placeholder="1" min="1"
            onChange={(event) => setNewSocial(event.target.value)}/>
            <h4>Character spirit value</h4>
            <input className="newSpiritValue" type="number" placeholder="1" min="1"
            onChange={(event) => setNewSpirit(event.target.value)}/>
            <br/>
            <button className="createNewCharacterBtn" onClick={createCharacter}>Create character</button>
        </div>
    );
}

export default App;
