/* eslint-disable @typescript-eslint/no-require-imports -- This Node audit script intentionally uses CommonJS. */
const fs = require("fs");
const path = require("path");

const icons = {
  amazonwebservices: "amazonwebservices",
  azure: "azure",
  azuredevops: "azuredevops",
  googlecloud: "googlecloud",
  microsoftsqlserver: "microsoftsqlserver",
  argocd: "argocd",
};

const source = path.join(__dirname, "node_modules/devicon/icons");
const destination = path.join(__dirname, "public/devicon");

fs.mkdirSync(destination, { recursive: true });

for (const [name, folder] of Object.entries(icons)) {
  const directory = path.join(source, folder);

  if (!fs.existsSync(directory)) {
    console.log(`⚠️ Missing icon folder: ${folder}`);
    continue;
  }

  const files = fs.readdirSync(directory);

  const svg =
    files.find((file) => file === `${folder}-original.svg`) ||
    files.find((file) => file === `${folder}-plain.svg`) ||
    files.find((file) => file.endsWith(".svg"));

  if (!svg) {
    console.log(`⚠️ No SVG found for ${name}`);
    continue;
  }

  fs.copyFileSync(
    path.join(directory, svg),
    path.join(destination, `${name}.svg`)
  );

  console.log(`✅ ${name}: ${svg}`);
}