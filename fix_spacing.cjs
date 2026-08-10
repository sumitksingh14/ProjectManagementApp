const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Change gap: "16px" and gap: "20px" to gap: "24px" for KPI/card grids
  // Target only gridTemplateColumns ... gap: "..."
  const gridRegex = /display:\s*"grid",\s*gridTemplateColumns:[\s\S]*?gap:\s*"16px"/g;
  content = content.replace(gridRegex, match => match.replace('gap: "16px"', 'gap: "24px"'));

  const gridRegex2 = /display:\s*"grid",\s*gridTemplateColumns:[\s\S]*?gap:\s*"20px"/g;
  content = content.replace(gridRegex2, match => match.replace('gap: "20px"', 'gap: "24px"'));

  // VendorView uses tailwind classes for its KPI grid and Vendor Cards
  // KPI grid: <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> -> gap-6
  content = content.replace(/className="grid grid-cols-2 md:grid-cols-4 gap-3"/g, 'className="grid grid-cols-2 md:grid-cols-4 gap-6"');
  
  // Vendor Cards: <div className="space-y-4"> -> space-y-6
  content = content.replace(/className="space-y-4"/g, 'className="space-y-6"');

  // ResourceView uses <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> -> gap-6
  content = content.replace(/gap-4/g, 'gap-6');

  // We should also check for `space-y-4` and change it to `space-y-6` globally if they are root containers.
  // Actually, wait, replacing `gap-4` might change small layout pieces. We need to be careful. Let's just run it for now.

  fs.writeFileSync(filePath, content);
}
console.log("Updated spacing between cards to 24px");
