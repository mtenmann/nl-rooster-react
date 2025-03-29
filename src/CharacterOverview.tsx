import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Character = {
  id: string;
  name: string;
  realm: string;
  className: string;
  classIcon: string;
  equippedItemLevel: number;
  activeSpec: string;
  mythicRating: number;
  mythicRatingColor: string;
  bestPerfAvgScore: number;
};

// Determine the role based on className and activeSpec
const determineRole = (className: string, activeSpec: string): string => {
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
    case "rogue":
    case "mage":
    case "warlock":
      return "DPS";
    case "priest":
      return spec === "discipline" || spec === "holy" ? "Healer" : "DPS";
    case "death knight":
      return spec === "blood" ? "Tank" : "DPS";
    case "shaman":
      return spec === "restoration" ? "Healer" : "DPS";
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
      return "DPS";
  }
};

export default function CharacterOverview() {
  const { team } = useParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortField, setSortField] = useState<keyof Character>("equippedItemLevel");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/characters/overview?team=${team}`)
      .then(({ data }) => {
        const sortedData = data.sort(
          (a: Character, b: Character) => b.equippedItemLevel - a.equippedItemLevel
        );
        setCharacters(sortedData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setError("Failed to load character data.");
      });
  }, [team]);

  const handleSort = (field: keyof Character) => {
    let newSortOrder: "asc" | "desc" = "desc";
    if (sortField === field) {
      newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    }
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
                <td className="border p-2">{Math.round(c.bestPerfAvgScore)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
