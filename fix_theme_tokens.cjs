const fs = require("fs");
const path = require("path");

const modulesDir = path.join(__dirname, "src/components/modules");

function getTsxFiles(dir, result = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== "ideas") getTsxFiles(full, result);
    else if (e.isFile() && e.name.endsWith(".tsx")) result.push(full);
  }
  return result;
}

// Patterns to fix
const fixes = [
  // Remove fontFamily from style objects (with trailing comma space variations)
  { find: /,?\s*fontFamily:\s*["']Inter,\s*sans-serif["']\s*,?/g, replace: "" },
  // Fix gap: "25px" → gap: "24px"
  { find: /gap:\s*["']25px["']/g, replace: `gap: "24px"` },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let changed = false;

  for (const fix of fixes) {
    const newContent = content.replace(fix.find, fix.replace);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  // Clean up any double-comma or trailing/leading commas inside style={{ }}
  // e.g. { , display: ... } or { display: ..., , }
  content = content.replace(/\{\s*,\s*/g, "{ ");
  content = content.replace(/,\s*,/g, ",");
  content = content.replace(/,\s*\}/g, " }");

  if (changed) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`);
  }
}

// Find all .tsx files in modules (not ideas subdir - already handled)
const files = getTsxFiles(modulesDir);
files.forEach(processFile);
console.log(`\nDone. Processed ${files.length} files.`);
