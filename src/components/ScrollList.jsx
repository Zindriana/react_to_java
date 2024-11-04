import {useEffect, useState} from "react";
import {API_BASE_URL} from "../config.js";

function ScrollList() {
    const [scrolls, setScrolls] = useState([]);
    const [scrollText, setScrollText] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/getscrolls`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setScrolls(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function handleReadScroll(scroll) {
        let language = scroll.language;
        fetch(`${API_BASE_URL}/getcharacters`)
            .then(response => response.json())
            .then(data => {
                const activeHero = data.find(hero => hero.isActive);
                if (activeHero) {
                    if ((language === 'Dwarven' && activeHero.canDwarven) ||
                        (language === 'Elven' && activeHero.canElven) ||
                        (language === 'Human' && activeHero.canHuman) ||
                        (language === 'Orc' && activeHero.canOrc)) {
                        fetch(`${API_BASE_URL}/decrypt`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ content: scroll.content })
                        })
                            .then(response => response.json())
                            .then(decryptedData => {
                                setScrollText(decryptedData.decryptedText);
                            })
                            .catch(error => console.error('Error:', error));
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <p>{scrollText}</p>
            <h1>Scroll List</h1>
            <ul>
                {scrolls.map((scroll, index) => (
                    <li key={index}>
                        <h2>{scroll.name}</h2>
                        <button className="readScrollBtn" onClick={() => handleReadScroll(scroll)}>Läs</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ScrollList;