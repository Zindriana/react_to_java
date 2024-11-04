import { useState } from 'react';
import {API_BASE_URL} from "../config.js";

function CreateScroll() {
    const [newScrollName, setNewScrollName] = useState('');
    const [newScrollLanguage, setNewScrollLanguage] = useState('dwarven');
    const [newScrollContent, setNewScrollContent] = useState('');

    function createNewScroll() {
        fetch(`${API_BASE_URL}/newscroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newScrollName,
                language: newScrollLanguage,
                content: newScrollContent,
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
    return(
        <>
            <h3>Create a new scroll</h3>
            <h4>Scroll name</h4>
            <input className="newScrollName" type="text" placeholder="Name"
                   onChange={(event) => setNewScrollName(event.target.value)}/>
            <h4>Scroll Language</h4>
            <select className="newScrollLanguage" value={newScrollLanguage}
                    onChange={(event) => setNewScrollLanguage(event.target.value)}>
                    <option value="dwarven">Dwarven</option>
                    <option value="elven">Elvish</option>
                    <option value="human">Human</option>
                    <option value="orc">Orcish</option>
            </select>
                <h4>Scroll Text</h4>
                <input className="newScrollContent" type="textarea"
                       onChange={(event) => setNewScrollContent(event.target.value)}/>
                <button className="createNewScrollBtn" onClick={createNewScroll}>Create scroll</button>
            </>
            );
            }

            export default CreateScroll