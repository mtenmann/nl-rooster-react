import { useEffect, useState } from "react";
import axios from "axios";
import { Character } from "./types/Character";
import { determineRole } from "./helpers/determineRole";

type Props = { team: string };

export default function CharacterOverview({ team }: Props) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortField, setSortField] =
    useState<keyof Character>("equippedItemLevel");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/characters/overview?team=${team}`)
      .then(({ data }) => {
        const sortedData = data.sort(
          (a: Character, b: Character) =>
            b.equippedItemLevel - a.equippedItemLevel
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
      <h1 className="text-3xl font-bold mb-4">Character Overview for {team}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Class Icon</th>
            {tableContent.map((item) => (
              <th
                key={item.header}
                className="border p-2 cursor-pointer"
                onClick={() => handleSort(item.field)}
              >
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {characters.map((c) => {
            const role = determineRole(c.className, c.activeSpec);
            return (
              <tr key={c.id}>
                <td className="border p-2">
                  <img
                    src={c.classIcon}
                    alt={c.className}
                    width={32}
                    height={32}
                  />
                </td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.realm}</td>
                <td className="border p-2">{c.equippedItemLevel}</td>
                <td className="border p-2">{c.activeSpec}</td>
                <td className="border p-2">{role}</td>
                <td
                  className="border p-2"
                  style={{ color: c.mythicRatingColor }}
                >
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

const tableContent = [
  { header: "Name", field: "name" },
  { header: "Realm", field: "realm" },
  { header: "Item Level", field: "equippedItemLevel" },
  { header: "Spec", field: "activeSpec" },
  { header: "Role", field: "role" },
  { header: "Mythic+ Rating", field: "mythicRating" },
  { header: "Avg Score Raid", field: "bestPerfAvgScore" },
] as const;
