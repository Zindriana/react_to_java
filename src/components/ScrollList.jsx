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
        console.log(scroll);
        fetch(`${API_BASE_URL}/getcharacters`)
            .then(response => response.json())
            .then(data => {
                const activeHero = data.find(hero => hero.active);
                console.log(activeHero);
                console.log('Scroll language:', language);
                console.log('Hero abilities:', {
                    canDwarven: activeHero.canDwarven,
                    canElven: activeHero.canElven,
                    canHuman: activeHero.canHuman,
                    canOrc: activeHero.canOrc
                });
                if (activeHero) {
                    if ((language === 'dwarven' && activeHero.canDwarven) ||
                        (language === 'elven' && activeHero.canElven) ||
                        (language === 'human' && activeHero.canHuman) ||
                        (language === 'orc' && activeHero.canOrc)) {
                        fetch(`${API_BASE_URL}/decrypt`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ content: scroll.content })
                        })
                            .then(response => {
                                console.log('Response status:', response.status);
                                return response.json();
                            })
                            .then(decryptedData => {
                                console.log('Decrypted data:', decryptedData);
                                setScrollText(decryptedData.content);
                            }).catch(error => {
                            console.error('Error during fetch:', error);
                        });
                    }
                } else { console.log("No active hero")}
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <p>Scroll text: {scrollText}</p>
            <h1>Scroll List</h1>
            <ul>
                {scrolls.map((scroll, index) => (
                    <li key={index}>
                        <h2>{scroll.name}</h2>
                        <p>{scroll.content}</p>
                        <button className="readScrollBtn" onClick={() => {handleReadScroll(scroll)}}>Läs</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ScrollList;