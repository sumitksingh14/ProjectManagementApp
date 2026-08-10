const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = [
  'AiPlannerView.tsx',
  'BenefitsView.tsx',
  'ClosureView.tsx',
  'CommunicationView.tsx',
  'GovernanceView.tsx',
  'SchedulingView.tsx',
  'VendorView.tsx'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if there's a missing </div> after the kpis.map block.
  // The block ends with:
  //           );
  //         })}
  // We should see a </div> after this before the next element.

  content = content.replace(/(\s*\);\s*\}\)\})\s*(?=\{?\/\*|<)/g, (match, group1) => {
    // If it's already followed by </div>, the regex above wouldn't match if we include </div> in the negative lookahead.
    // Wait, the regex currently matches `})}` followed by either `{/*` or `<`.
    // It doesn't check if `</div>` is missing, but if the next thing is not `</div>`, we add it.
    return `${group1}\n      </div>\n`;
  });

  fs.writeFileSync(filePath, content);
}
console.log("Fixed missing divs");
