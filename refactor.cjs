const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'components', 'modules');
const excludeFiles = ['DashboardView.tsx', 'PortfolioView.tsx'];

const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.tsx') && !excludeFiles.includes(f));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(modulesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const origContent = content;

    // Root container replacement
    content = content.replace(/className="(p-6 max-w-[a-z0-9]+ mx-auto space-y-6) text-slate-900"/g, 'className="$1 animate-fadeIn"');
    
    // Glass card conversions
    content = content.replace(/bg-white border border-slate-200/g, 'glass-card');
    content = content.replace(/bg-white shadow-sm border border-slate-200/g, 'glass-card');
    content = content.replace(/bg-white rounded-xl shadow-sm border border-slate-200/g, 'glass-card rounded-xl');
    content = content.replace(/bg-white shadow-sm rounded-xl p-[0-9]+/g, 'glass-card p-6');
    content = content.replace(/bg-white p-6 rounded-xl border border-slate-200 shadow-sm/g, 'glass-card p-6');
    content = content.replace(/bg-white border border-slate-200 p-[0-9]+ rounded-xl shadow-sm/g, 'glass-card p-5');
    content = content.replace(/bg-white/g, 'bg-[var(--bg-card)]');
    
    // Text colors
    content = content.replace(/text-slate-900/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-slate-800/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-slate-700/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-slate-600/g, 'text-[var(--text-secondary)]');
    content = content.replace(/text-slate-500/g, 'text-[var(--text-secondary)]');
    content = content.replace(/text-slate-400/g, 'text-[var(--text-muted)]');
    content = content.replace(/text-slate-300/g, 'text-[var(--text-muted)]');
    content = content.replace(/text-gray-900/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-gray-800/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-gray-700/g, 'text-[var(--text-primary)]');
    content = content.replace(/text-gray-600/g, 'text-[var(--text-secondary)]');
    content = content.replace(/text-gray-500/g, 'text-[var(--text-secondary)]');
    
    // Borders
    content = content.replace(/border-slate-200/g, 'border-[var(--border)]');
    content = content.replace(/border-slate-100/g, 'border-[var(--border)]');
    content = content.replace(/border-slate-300/g, 'border-[var(--border)]');
    content = content.replace(/border-gray-200/g, 'border-[var(--border)]');
    
    // Backgrounds
    content = content.replace(/bg-slate-50/g, 'bg-[var(--bg-card)]');
    content = content.replace(/bg-slate-100/g, 'bg-[var(--bg-card-hover)]');
    content = content.replace(/hover:bg-slate-50/g, 'hover:bg-[var(--bg-card-hover)]');
    content = content.replace(/hover:bg-slate-100/g, 'hover:bg-[var(--bg-card-hover)]');
    
    // Indigo / Theme accents
    content = content.replace(/text-indigo-600/g, 'text-[var(--accent)]');
    content = content.replace(/text-indigo-700/g, 'text-[var(--accent)]');
    content = content.replace(/bg-indigo-50/g, 'bg-[var(--accent-glow)]');
    content = content.replace(/bg-indigo-600/g, 'bg-[var(--accent)]');
    content = content.replace(/hover:bg-indigo-700/g, 'hover:bg-[var(--accent-2)]');
    content = content.replace(/border-indigo-200/g, 'border-[var(--accent-border)]');
    
    // Other colors
    content = content.replace(/text-emerald-600/g, 'text-[var(--green)]');
    content = content.replace(/text-emerald-700/g, 'text-[var(--green)]');
    content = content.replace(/bg-emerald-50/g, 'bg-[var(--green-dim)]');
    content = content.replace(/bg-emerald-100/g, 'bg-[var(--green-dim)]');
    
    content = content.replace(/text-amber-600/g, 'text-[var(--amber)]');
    content = content.replace(/text-amber-700/g, 'text-[var(--amber)]');
    content = content.replace(/bg-amber-50/g, 'bg-[var(--amber-dim)]');
    
    content = content.replace(/text-red-600/g, 'text-[var(--pink)]');
    content = content.replace(/text-red-700/g, 'text-[var(--pink)]');
    content = content.replace(/bg-red-50/g, 'bg-[var(--pink-dim)]');
    
    // Specific Semantic replacements
    // Uppercase headings
    content = content.replace(/text-xs font-bold text-\[var\(--text-primary\)\] uppercase tracking-wider/g, 'section-label');
    content = content.replace(/text-xs font-semibold text-\[var\(--text-secondary\)\] uppercase tracking-wider/g, 'section-label');
    
    if (content !== origContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log(`Modified ${file}`);
    }
});

console.log(`\nSuccessfully modified ${modifiedCount} files.`);
