import {useEffect} from "react";

function CharacterList() {
    useEffect(() => {
        fetch("http://localhost:9090/getcharacters")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Characters:', data);
                //navigera till en ny sida som visar listan av karaktärer (objekts från backend)
            })
            .catch(error => console.error('Error:', error));
    }, []);
}

export default CharacterList;