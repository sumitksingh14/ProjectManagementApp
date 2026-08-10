const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix ISS-59 and similar owner data bugs if any exist directly in files (probably not, it's in context, but just in case)

  // Standardize KPI Card Rendering
  const kpiMapRegex = /\{kpis\.map\(\(kpi,\s*i\)\s*=>\s*\([\s\S]*?className="glass-card"[\s\S]*?padding:\s*"20px"[\s\S]*?\}\s*>\s*([\s\S]*?)\s*<\/div>\s*\)\s*\}/g;

  let changed = false;
  content = content.replace(kpiMapRegex, (match, innerContent) => {
    if (innerContent.includes('Icon style=')) return match;
    changed = true;
    return `{kpis.map((kpi, i) => {
          const Icon = kpi.icon || Activity;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "20px",
                background: \`linear-gradient(135deg, \${kpi.glowColor} 0%, var(--bg-card) 60%)\`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <p className="section-label">{kpi.label}</p>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: kpi.glowColor, border: \`1px solid \${kpi.accentColor}40\`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon style={{ width: "15px", height: "15px", color: kpi.accentColor }} />
                </div>
              </div>
              <div className="kpi-value" style={{ marginBottom: "4px" }}>{kpi.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "20px" }}>
                {(kpi.delta && kpi.up !== undefined) && (kpi.up
                  ? <ArrowUpRight style={{ width: "13px", height: "13px", color: "var(--green)" }} />
                  : <ArrowDownRight style={{ width: "13px", height: "13px", color: "var(--pink)" }} />
                )}
                {kpi.delta && <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: kpi.up !== undefined ? (kpi.up ? "var(--green)" : "var(--pink)") : "var(--text-primary)" }}>{kpi.delta}</span>}
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "6px" }}>{kpi.sub}</p>
            </div>
          );
        })}`;
  });

  if (changed) {
    // Add missing lucide-react imports
    const lucideImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    if (lucideImportMatch) {
      let imports = lucideImportMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      const toAdd = ['Activity', 'ArrowUpRight', 'ArrowDownRight'];
      toAdd.forEach(imp => {
        if (!imports.includes(imp)) imports.push(imp);
      });
      content = content.replace(lucideImportMatch[0], `import { ${imports.join(', ')} } from "lucide-react"`);
    } else {
      content = `import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";\n` + content;
    }
  }

  // Standardize Card Table Section Headers
  // We want to make sure headers look like the one in BudgetCostView (with an icon and proper spacing)
  // Or at least have the same text formatting.
  // We'll replace simple `<h3 style={{ ... fontSize: "var(--text-md)" ... }}>` or `fontSize: "12px"` uppercase ones.
  // Actually, many already have `fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em"`
  
  fs.writeFileSync(filePath, content);
}
console.log("Done updating modules");
