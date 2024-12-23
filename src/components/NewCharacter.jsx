import { useState } from 'react';

function Create() {
    const [newCharacterName, setNewCharacterName] = useState('');
    const [newMental, setNewMental] = useState('');
    const [newPhysical, setNewPhysical] = useState('');
    const [newSocial, setNewSocial] = useState('');
    const [newSpirit, setNewSpirit] = useState('');
    const [canDwarven, setCanDwarven] = useState(false);
    const [canElven, setCanElven] = useState(false);
    const [canHuman, setCanHuman] = useState(false);
    const [canOrc, setCanOrc] = useState(false);

    function createCharacter() {
        fetch(`https://91.128.148.203:9090/newcharacter`, {
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
                canDwarven: canDwarven,
                canElven: canElven,
                canHuman: canHuman,
                canOrc: canOrc,
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
            <h4>Select Languages</h4>
            <label>
                <input type="checkbox" checked={canDwarven} onChange={() => setCanDwarven(!canDwarven)}/>
                Dwarven
            </label>
            <label>
                <input type="checkbox" checked={canElven} onChange={() => setCanElven(!canElven)}/>
                Elven
            </label>
            <label>
                <input type="checkbox" checked={canHuman} onChange={() => setCanHuman(!canHuman)}/>
                Human
            </label>
            <label>
                <input type="checkbox" checked={canOrc} onChange={() => setCanOrc(!canOrc)}/>
                Orc
            </label>
            <button className="createNewCharacterBtn" onClick={createCharacter}>Create character</button>
        </>
    );
}

export default Create