/* eslint-disable @typescript-eslint/no-require-imports -- This Node audit script intentionally uses CommonJS. */
const icons = require("simple-icons");
const data = require("./databricks.json");

const names = [
  ...new Set(
    data["Consolidated Tech Stack"]
      .split(/\n\s*\n/)
      .flatMap((block) => {
        const lines = block.trim().split("\n");
        return lines.slice(1).join(" ").split(",");
      })
      .map((name) => name.trim())
      .filter(Boolean)
  ),
];

const normalize = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const available = Object.values(icons).filter(
  (icon) => icon && typeof icon.title === "string"
);

const found = [];
const missing = [];

for (const name of names) {
  const icon = available.find(
    (item) => normalize(item.title) === normalize(name)
  );

  if (icon) {
    found.push(name);
  } else {
    missing.push(name);
  }
}

console.log(`Total unique technologies: ${names.length}`);
console.log(`Simple Icons matches: ${found.length}`);
console.log(`Remaining: ${missing.length}`);

console.log("\nLOGOS AVAILABLE:");
console.log(found.join("\n"));

console.log("\nREQUIRES ADDITIONAL MAPPING:");
console.log(missing.join("\n"));
