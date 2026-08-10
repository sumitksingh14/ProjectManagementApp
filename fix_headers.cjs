const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Find table wrapper header patterns
  // Pattern: <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)"(, marginBottom: "16px")? }}>{Title}</h3>
  // We want to skip forms (like Report New Issue) and target the ones followed by <button> or table or inside a flex container.
  
  // Let's target the glass-card that contains a table. We know it usually has an h3 and a button.
  // Actually, it's easier to just do a regex replace on the h3 styling for headers that don't already have textTransform: "uppercase".
  // Let's replace: <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)"(,\s*marginBottom:\s*"16px")? }}>
  // With: <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>

  const h3Regex = /<h3\s+style=\{\{\s*fontSize:\s*"var\(--text-md\)",\s*fontWeight:\s*700,\s*color:\s*"var\(--text-primary\)"(,\s*marginBottom:\s*"16px")?\s*\}\}>/g;
  
  content = content.replace(h3Regex, (match, mb) => {
    return `<h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em"${mb ? mb : ''} }}>`;
  });

  // Also replace simple ones that might be `<h3 style={{ fontSize: "14px", fontWeight: 600 }}>` or similar
  const h3Regex2 = /<h3\s+style=\{\{\s*fontSize:\s*"14px",\s*fontWeight:\s*600,\s*color:\s*"var\(--text-primary\)"\s*\}\}>/g;
  content = content.replace(h3Regex2, `<h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>`);

  fs.writeFileSync(filePath, content);
}
console.log("Done updating h3 headers");
