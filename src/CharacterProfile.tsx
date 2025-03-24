import React, { useState } from "react";
import axios from "axios";

const CharacterProfile = () => {
    const [realm, setRealm] = useState("");
    const [character, setCharacter] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchCharacter = async () => {
        try {
            // Convert to lowercase to match API expectations if necessary
            const realmLower = realm.trim().toLowerCase();
            const characterLower = character.trim().toLowerCase();
            const response = await axios.get(
                `http://localhost:8080/api/character/${realmLower}/${characterLower}`
            );
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching character:", err);
            setError("Error fetching character data. Please check the realm/character name.");
            setData(null);
        }
    };

    return (
        <div>
            <h1>...</h1>
            <input
                type="text"
                placeholder="Realm"
                value={realm}
                onChange={(e) => setRealm(e.target.value)}
            />
            <input
                type="text"
                placeholder="Character Name"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
            />
            <button onClick={fetchCharacter}>Get Character</button>

            {error && <p style={{color: "red"}}>{error}</p>}

            {data && (
                <div>
                    <h2>{data.name}</h2>
                    <p>Level: {data.level}</p>
                    <p>Faction: {data.faction && data.faction.name}</p>
                    <p>Class: {data.character_class && data.character_class.name}</p>
                    {/* Render additional details as needed */}
                </div>
            )}
        </div>
    );
};

export default CharacterProfile;
