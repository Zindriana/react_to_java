import {useEffect, useState} from "react";
import {API_BASE_URL} from "../config.js";

function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/getcharacters`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCharacters(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function handleChooseCharacter(selectedCharacter){
        characters.forEach(character => {
            const isActive = character === selectedCharacter;
            fetch(`${API_BASE_URL}/updatecharacters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: character.name,
                    active: isActive
                }),
            })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => console.error('Error updating character:', error)); // Hantera eventuella fel
        });
    }

    return (
        <div>
            <h1>Character List</h1>
            <ul>
                {characters.map((character, index) => (
                    <li key={index}>
                        <h2>{character.name}</h2>
                        <button className="chooseCharacterBtn" onClick={() => handleChooseCharacter(character)}>Choose this character</button>
                        <p>Active: {character.active  ? 'Yes' : 'No'}</p>
                        <p>Mental: {character.mental}</p>
                        <p>Physical: {character.physical}</p>
                        <p>Social: {character.social}</p>
                        <p>Spirit: {character.spirit}</p>
                        <p>Dwarven: {character.canDwarven ? 'Yes' : 'No'}</p>
                        <p>Elvish: {character.canElven ? 'Yes' : 'No'}</p>
                        <p>Human: {character.canHuman ? 'Yes' : 'No'}</p>
                        <p>Orc: {character.canOrc ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterList;