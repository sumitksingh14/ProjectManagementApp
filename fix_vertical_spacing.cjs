const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace space-y-4 and space-y-3 with space-y-6
  content = content.replace(/\bspace-y-[34]\b/g, 'space-y-6');

  // Replace gap-4 and gap-5 with gap-6 for grids
  // Only when gap-4 is part of a grid layout (e.g. `grid gap-4` or `grid-cols-X gap-4`)
  content = content.replace(/gap-[34]\b(?=.*(?:grid|flex-col))/g, 'gap-6');
  // Alternatively, just replace gap-4 that appears after grid-cols
  content = content.replace(/grid-cols-\d\s+gap-[34]/g, match => match.replace(/gap-[34]/, 'gap-6'));

  // Let's also make sure all lists of mapped items use space-y-6 or gap-6
  // Wait, the above simple replace is powerful enough.
  
  fs.writeFileSync(filePath, content);
}
console.log("Updated space-y-3 and space-y-4 to space-y-6 in all modules");
