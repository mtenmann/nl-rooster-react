import { useEffect, useState } from "react";
import axios from "axios";
import { Character } from "./types/Character";

type Props = {
  team: string;
};

export default function TeamOverview({ team }: Props) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortField, setSortField] = useState<keyof Character>("equippedItemLevel");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/characters/overview?team=${team}`)
      .then(({ data }) => {
        const sorted = data.sort((a: Character, b: Character) =>
          b.equippedItemLevel - a.equippedItemLevel
        );
        setCharacters(sorted);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setError("Failed to load character data.");
      });
  }, [team]);

  const handleSort = (field: keyof Character) => {
    const newSortOrder = sortField === field && sortOrder === "desc" ? "asc" : "desc";
    setSortField(field);
    setSortOrder(newSortOrder);

    setCharacters((prev) =>
      [...prev].sort((a: Character, b: Character) => {
        const aVal = a[field];
        const bVal = b[field];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return newSortOrder === "desc" ? bVal - aVal : aVal - bVal;
        }

        return newSortOrder === "desc"
          ? (bVal as string).localeCompare(aVal as string)
          : (aVal as string).localeCompare(bVal as string);
      })
    );
  };

  return (
    <div>
      <h2>Team Overview for {team}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("realm")}>Realm</th>
            <th onClick={() => handleSort("equippedItemLevel")}>Item Level</th>
            <th>Class</th>
            <th>Spec</th>
            <th>Role</th>
            <th onClick={() => handleSort("mythicRating")}>Mythic+ Rating</th>
            <th onClick={() => handleSort("bestPerfAvgScore")}>Raid Avg</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((c) => (
            <tr key={c.id}>
              <td>
                <a href={c.blizzardUrl} target="_blank" rel="noreferrer">
                  {c.name}
                </a>
              </td>
              <td>{c.realm}</td>
              <td>{c.equippedItemLevel}</td>
              <td>{c.className}</td>
              <td>{c.activeSpec}</td>
              <td>{c.role}</td>
              <td style={{ color: c.mythicRatingColor }}>
                <a href={c.raiderIoUrl} target="_blank" rel="noreferrer">
                  {Math.floor(c.mythicRating)}
                </a>
              </td>
              <td>
                <a href={c.warcraftLogsUrl} target="_blank" rel="noreferrer">
                  {Math.round(c.bestPerfAvgScore)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
