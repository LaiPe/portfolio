import fs from "node:fs";
import path from "node:path";

/**
 * Lit les slugs des projets depuis les fichiers JSON
 */
function getProjectSlugs() {
  const projectsDir = path.resolve("src/data/projects");
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith(".json"));

  return files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(projectsDir, file), "utf-8"));
    return content.slug || path.basename(file, ".json");
  });
}

/** @type {import("@react-router/dev/config").Config} */
export default {
  ssr: false,
  prerender: [
    "/",
    "/projets",
    "/apropos",
    "/services",
    "/contact",
    ...getProjectSlugs().map(slug => `/projets/${slug}`),
  ],
};
