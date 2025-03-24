// TeamOverview.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function TeamOverview({ team }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("equippedItemLevel");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/characters/overview/${team}`)
      .then((response) => {
        // Sort descending by default
        const sortedData = response.data.sort(
          (a, b) => b.equippedItemLevel - a.equippedItemLevel
        );
        setCharacters(sortedData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setError("Failed to load character data.");
      });
  }, [team]);

  const handleSort = (field) => {
    let newSortOrder = "desc";
    if (sortField === field) {
      newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    }
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedCharacters = [...characters].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === "number") {
        return newSortOrder === "desc" ? bVal - aVal : aVal - bVal;
      } else {
        return newSortOrder === "desc"
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }
    });
    setCharacters(sortedCharacters);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>{team.toUpperCase()} Overview</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Class</th>
            <th className="cursor-pointer" onClick={() => handleSort("name")}>Name</th>
            <th className="cursor-pointer" onClick={() => handleSort("realm")}>Realm</th>
            <th className="cursor-pointer" onClick={() => handleSort("equippedItemLevel")}>Item Level</th>
            <th className="cursor-pointer" onClick={() => handleSort("activeSpec")}>Spec</th>
            <th className="cursor-pointer" onClick={() => handleSort("role")}>Role</th>
            <th className="cursor-pointer" onClick={() => handleSort("mythicRating")}>Mythic+ Rating</th>
            <th className="cursor-pointer" onClick={() => handleSort("bestPerfAvgScore")}>Best Perf. Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char, idx) => (
            <tr key={idx}>
              <td>
                <img
                  src={char.classIcon}
                  alt={char.className}
                  width="32"
                  height="32"
                />
              </td>
              <td>{char.name}</td>
              <td>{char.realm}</td>
              <td>{char.equippedItemLevel}</td>
              <td>{char.activeSpec}</td>
              <td>{char.role}</td>
              <td style={{ color: char.mythicRatingColor }}>
                {Math.round(char.mythicRating)}
              </td>
              <td>{Math.round(char.bestPerfAvgScore)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamOverview;
