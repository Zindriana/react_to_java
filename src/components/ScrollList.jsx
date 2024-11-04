import {useEffect, useState} from "react";
import {API_BASE_URL} from "../config.js";

function ScrollList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/getscrolls`)
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
            <h1>Scroll List</h1>
            <ul>
                {characters.map((scroll, index) => (
                    <li key={index}>
                        <h2>{scroll.name}</h2>
                        <p>Text: {scroll.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScrollList;