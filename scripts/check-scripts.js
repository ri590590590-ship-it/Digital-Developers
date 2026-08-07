/**
 * QA helper — runs `node --check` on every inline <script> found in the
 * project's HTML/TSX files that contains plain JS (IIFE bodies we embedded).
 * Usage: npm run qa:scripts
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const root = path.resolve(__dirname, '..');
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dd-qa-'));

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(html|tsx|js|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function extractScripts(content) {
  const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
  const out = [];
  let m;
  while ((m = re.exec(content))) {
    if (m[1].trim()) out.push(m[1]);
  }
  return out;
}

const files = walk(root);
let failures = 0;
let total = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const scripts = extractScripts(content);
  scripts.forEach((code, i) => {
    total++;
    const tmp = path.join(tmpDir, `${path.basename(file)}-${i}.js`);
    fs.writeFileSync(tmp, code);
    try {
      execSync(`node --check "${tmp}"`, { stdio: 'pipe' });
    } catch (err) {
      failures++;
      console.error(`FAIL: ${path.relative(root, file)} script #${i}`);
      console.error(String(err.stderr || err.message).slice(0, 600));
    }
  });
}

console.log(`Checked ${total} inline scripts across ${files.length} files — ${failures} failure(s).`);
process.exit(failures ? 1 : 0);
