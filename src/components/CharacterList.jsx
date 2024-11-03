import {useEffect, useState} from "react";

function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch("https://dull-carrots-hear.loca.lt/getcharacters")
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

    return (
        <div>
            <h1>Character List</h1>
            <ul>
                {characters.map((character, index) => (
                    <li key={index}>
                        <h2>{character.name}</h2>
                        <p>Mental: {character.mental}</p>
                        <p>Physical: {character.physical}</p>
                        <p>Social: {character.social}</p>
                        <p>Spirit: {character.spirit}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterList;