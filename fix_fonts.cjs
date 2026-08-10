const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace text-[10px] with text-[12px]
  content = content.replace(/text-\[10px\]/g, 'text-[12px]');

  // Replace fontSize: "10px" with fontSize: "12px"
  content = content.replace(/fontSize:\s*"10px"/g, 'fontSize: "12px"');

  // Replace any inline buttons that have hardcoded inline styles missing `btn-accent` or missing aria-labels
  // Note: doing this via regex might be brittle, so I'll handle aria-labels manually or with a safer regex.
  
  // For badges padding standardization: px-1.5 py-0.5 -> px-2.5 py-1
  content = content.replace(/px-1\.5 py-0\.5/g, 'px-2.5 py-1');

  // Ensure responsive grid on DashboardView
  // from: gridTemplateColumns: "1fr 320px"
  // to: gridTemplateColumns: "1fr" (and handle via Tailwind classes `grid-cols-1 lg:grid-cols-[1fr_320px]`)
  // Let's hold off on layout changes in this script and do them manually.

  fs.writeFileSync(filePath, content);
}
console.log("Updated 10px fonts to 12px and standardized badge padding");
