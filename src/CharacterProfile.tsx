import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Character } from "./types/Character";

export default function CharacterProfile() {
  const { name, realm } = useParams<{ name: string; realm: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/characters/profile?name=${name}&realm=${realm}`)
      .then(({ data }) => {
        setCharacter(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching character data. Please check the realm/character name.");
      });
  }, [name, realm]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!character) return <p>Loading...</p>;

  return (
    <div>
      <h2>{character.name} - Level {character.level}</h2>
      <p>Faction: {character.faction}</p>
      <p>Class: {character.character_class}</p>
      <p>Mythic Rating: <span style={{ color: character.mythicRatingColor }}>{character.mythicRating}</span></p>
      <p>Raid Avg Score: {Math.round(character.bestPerfAvgScore)}</p>
      <p>
        <a href={character.raiderIoUrl} target="_blank" rel="noreferrer">Raider.IO</a>
      </p>
      <p>
        <a href={character.warcraftLogsUrl} target="_blank" rel="noreferrer">Warcraft Logs</a>
      </p>
      <p>
        <a href={character.blizzardUrl} target="_blank" rel="noreferrer">Blizzard Profile</a>
      </p>
    </div>
  );
}
