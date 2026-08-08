const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'components', 'modules');
const excludeFiles = ['DashboardView.tsx'];

const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.tsx') && !excludeFiles.includes(f));

let modifiedCount = 0;
let failedFiles = [];

function getBalancedDiv(content, startIndex) {
    let index = content.indexOf('<div', startIndex);
    if (index === -1) return null;
    let depth = 0;
    let i = index;
    while(i < content.length) {
        if (content.substring(i, i+4) === '<div') {
            depth++;
            i += 4;
        } else if (content.substring(i, i+6) === '</div'+'>') {
            depth--;
            i += 6;
            if (depth === 0) {
                return { text: content.substring(index, i), start: index, end: i };
            }
        } else {
            i++;
        }
    }
    return null;
}

files.forEach(file => {
    const filePath = path.join(modulesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const origContent = content;

    // We only replace if we haven't already
    if (!content.includes('hero-banner animate-fadeIn')) {
        let headerCommentIndex = content.indexOf('{/* Header */}');
        if (headerCommentIndex !== -1) {
            let divBlock = getBalancedDiv(content, headerCommentIndex);
            if (divBlock) {
                let headerBlock = divBlock.text;
                
                let badgeMatch = headerBlock.match(/<span className="(?:section-label|badge-[a-z]+|text-[^"]*)[\s\S]*?>\s*([^<]+?)\s*<\/span>/);
                let badge = badgeMatch ? badgeMatch[1].trim() : "Module";

                let spans = [...headerBlock.matchAll(/<span[^>]*>\s*([\s\S]+?)\s*<\/span>/g)];
                let subtitle = "Enterprise PMO";
                if (spans.length >= 2) {
                    subtitle = spans[1][1].trim();
                }

                let h1Match = headerBlock.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/);
                let title = h1Match ? h1Match[1].trim().replace(/<[^>]+>/g, '') : "Title";

                let pMatch = headerBlock.match(/<p[^>]*>([\s\S]*?)<\/p>/);
                let desc = pMatch ? pMatch[1].trim() : "Description";

                let iconMatch = headerBlock.match(/<([A-Z][a-zA-Z0-9]+)\s+className="[^"]*w-[0-9]+ h-[0-9]+[^"]*"[^>]*\/>/);
                let iconTag = "";
                if (iconMatch) {
                    const iconName = iconMatch[1];
                    iconTag = `<${iconName} style={{ width: "32px", height: "32px", color: "#fff" }} />`;
                }

                const newHeader = `<div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              ${badge}
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>${subtitle}</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            ${title}
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            ${desc}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          ${iconTag}
        </div>
      </div>`;
      
                content = content.substring(0, divBlock.start) + newHeader + content.substring(divBlock.end);
            } else {
                failedFiles.push(file + " (No balanced div)");
            }
        } else {
            failedFiles.push(file + " (No Header comment)");
        }
    }

    if (content !== origContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log(`Modified ${file}`);
    }
});

console.log(`\nSuccessfully modified ${modifiedCount} files.`);
if (failedFiles.length > 0) {
    console.log(`Failed to match header in: ${failedFiles.join(', ')}`);
}
