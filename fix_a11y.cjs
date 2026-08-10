const fs = require('fs');
const path = require('path');

const dir = '/Users/singh_su/Documents/SumitWorkspace/ProjectManagementDashboard/ProjectManagementApp/src/components/modules';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // We want to add aria-label="Action" to buttons that have <Edit3 or <PlusCircle or <Trash2 but lack aria-label
  // A simple regex approach for buttons containing just an icon or primarily an icon
  // e.g. <button onClick={...}><PlusCircle /></button>
  
  content = content.replace(/(<button[^>]*?)(>[\s\n]*<(?:PlusCircle|Edit3|Trash|Trash2|Settings|X|Menu)[^>]*?>[\s\n]*<\/button>)/g, (match, p1, p2) => {
    if (p1.includes('aria-label')) {
      return match;
    }
    // Determine a reasonable aria-label based on the icon
    let label = "Action";
    if (p2.includes('PlusCircle')) label = "Add";
    else if (p2.includes('Edit3')) label = "Edit";
    else if (p2.includes('Trash')) label = "Delete";
    else if (p2.includes('Settings')) label = "Settings";
    else if (p2.includes('X')) label = "Close";
    else if (p2.includes('Menu')) label = "Menu";
    
    return `${p1} aria-label="${label}"${p2}`;
  });

  // What about buttons that have the icon inside, but maybe also have text? The prompt says "icon-only buttons".
  // The above regex specifically matches `<button...><Icon...></button>`.
  
  // Let's also check if there are buttons that have <Icon.../> but are not strictly icon only. Wait, the prompt specified icon-only.
  // Example in DashboardView: 
  // <button onClick={() => setShowAddForm(true)} className="btn-accent" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  //   <PlusCircle style={{ width: "13px", height: "13px" }} /> Add Project
  // </button>
  // This is NOT icon-only. So my regex is perfect.
  
  // Let's also find standalone <PlusCircle /> inside a div that acts like a button (like in VendorView or DashboardView header)
  // Actually, some places might just use <PlusCircle className="cursor-pointer" />
  // If it's a div, the user didn't ask for it, but for accessibility it should have role="button" and tabIndex={0}.
  // The task list specifically says: "Add aria-label to icon-only buttons (PlusCircle, Edit3, etc.)."

  fs.writeFileSync(filePath, content);
}
console.log("Added aria-labels to icon-only buttons");
