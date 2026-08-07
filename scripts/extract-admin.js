/**
 * Extract the admin IIFE from AdminDashboard.tsx into public/admin/admin.js
 * so it loads via <script src> (React does NOT execute innerHTML-injected scripts).
 */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'components', 'AdminDashboard.tsx');
const src = fs.readFileSync(srcPath, 'utf8');

// Find: const scriptHtml = "<...>";
const m = src.match(/const scriptHtml = ("[\s\S]*?");\n/);
if (!m) {
  console.error('Could not locate scriptHtml literal in AdminDashboard.tsx');
  process.exit(1);
}

let code;
try {
  code = JSON.parse(m[1]);
} catch (e) {
  console.error('Failed to JSON-parse scriptHtml:', e.message);
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'public', 'admin');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'admin.js');
fs.writeFileSync(outPath, code);

try {
  execSync(`node --check "${outPath}"`, { stdio: 'pipe' });
  console.log(`EXTRACTED public/admin/admin.js (${code.length} bytes) — node --check PASS`);
} catch (e) {
  console.error('node --check FAIL:');
  console.error(String(e.stderr || e.message).slice(0, 800));
  process.exit(1);
}
