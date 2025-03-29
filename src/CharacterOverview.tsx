// CharacterOverview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Determine the role based on className and activeSpec
const determineRole = (className, activeSpec) => {
  const c = className.toLowerCase();
  const spec = activeSpec.toLowerCase();
  switch (c) {
    case "warrior":
      return spec === "protection" ? "Tank" : "DPS";
    case "paladin":
      if (spec === "holy") return "Healer";
      if (spec === "protection") return "Tank";
      return "DPS";
    case "hunter":
      return "DPS";
    case "rogue":
      return "DPS";
    case "priest":
      return (spec === "discipline" || spec === "holy") ? "Healer" : "DPS";
    case "death knight":
      return spec === "blood" ? "Tank" : "DPS";
    case "shaman":
      return spec === "restoration" ? "Healer" : "DPS";
    case "mage":
      return "DPS";
    case "warlock":
      return "DPS";
    case "monk":
      if (spec === "brewmaster") return "Tank";
      if (spec === "mistweaver") return "Healer";
      return "DPS";
    case "druid":
      if (spec === "guardian") return "Tank";
      if (spec === "restoration") return "Healer";
      return "DPS";
    case "demon hunter":
      return spec === "vengeance" ? "Tank" : "DPS";
    case "evoker":
      return spec === "preservation" ? "Healer" : "DPS";
    default:
      return "DPS"; // Fallback role
  }
};

export default function CharacterOverview() {
  const { team } = useParams(); // e.g., "tempo"
  const [characters, setCharacters] = useState([]);
  const [sortField, setSortField] = useState("equippedItemLevel");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/characters/overview?team=${team}`)
      .then(({ data }) => {
        const sortedData = data.sort(
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
    setCharacters((prev) =>
      [...prev].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (typeof aVal === "number") {
          return newSortOrder === "desc" ? bVal - aVal : aVal - bVal;
        }
        return newSortOrder === "desc"
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      })
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        Character Overview for {team}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Class Icon</th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("name")}>
              Name
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("realm")}>
              Realm
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("equippedItemLevel")}>
              Item Level
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("activeSpec")}>
              Spec
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("role")}>
              Role
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("mythicRating")}>
              Mythic+ Rating
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("bestPerfAvgScore")}>
              Avg Score Raid
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((c) => {
            // Calculate role dynamically using determineRole
            const role = determineRole(c.className, c.activeSpec);
            return (
              <tr key={c.id}>
                <td className="border p-2">
                  <img src={c.classIcon} alt={c.className} width={32} height={32} />
                </td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.realm}</td>
                <td className="border p-2">{c.equippedItemLevel}</td>
                <td className="border p-2">{c.activeSpec}</td>
                <td className="border p-2">{role}</td>
                <td className="border p-2" style={{ color: c.mythicRatingColor }}>
                  {Math.floor(c.mythicRating)}
                </td>
                <td>{Math.round(char.bestPerfAvgScore)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
