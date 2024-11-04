import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import CharacterList from "./components/CharacterList.jsx";
import NewCharacter from "./components/NewCharacter.jsx";

function App() {
    const [message, setMessage] = useState('');
    const [dieValue, setDieValue] = useState(0);
    const [amountOfDiceInput, setAmountOfDiceInput] = useState(1);


    useEffect(() => {
        fetch(`https://91.128.148.203:9090/hello`)
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
        fetch(`https://91.128.148.203:9090/rolldie?amount=${amountOfDiceInput}`)
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
        <HashRouter>
            <div className="App">
                <h1>{message}</h1>
                <h2>Die Roll = {dieValue}</h2>
                <input className="amountOfDiceInput" type="number" placeholder="1" min="1"
                       onChange={(event) => setAmountOfDiceInput(Number(event.target.value))}/>
                <button className="rollDieButton" onClick={rollDie}>Roll die</button>
                <br/>
                <nav>
                    <Link to="/">Home</Link> |
                    <Link to="/characterlist">Character List</Link> |
                    <Link to="/newcharacter">New Character</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<div>Home</div>}/>
                    <Route path="/characterlist" element={<CharacterList/>}/>
                    <Route path="/newcharacter" element={<NewCharacter/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
