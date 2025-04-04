// Determine the role based on className and activeSpec
export const determineRole = (
  className: string,
  activeSpec: string
): string => {
  const roleMapping: Record<string, Record<string, string>> = {
    warrior: { protection: "Tank" },
    paladin: { holy: "Healer", protection: "Tank" },
    priest: { discipline: "Healer", holy: "Healer" },
    "death knight": { blood: "Tank" },
    shaman: { restoration: "Healer" },
    monk: { brewmaster: "Tank", mistweaver: "Healer" },
    druid: { guardian: "Tank", restoration: "Healer" },
    "demon hunter": { vengeance: "Tank" },
    evoker: { preservation: "Healer" },
  };

  const classKey = className.toLowerCase();
  const specKey = activeSpec.toLowerCase();

  return roleMapping[classKey]?.[specKey] || "DPS";
};
