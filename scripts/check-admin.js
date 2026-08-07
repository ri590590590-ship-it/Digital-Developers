/**
 * QA helper — verifies the admin behaviour script (public/admin/admin.js)
 * parses cleanly with node --check, and that AdminDashboard.tsx references it.
 * Usage: npm run qa:admin
 */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const adminJs = path.join(root, 'public', 'admin', 'admin.js');
const component = path.join(root, 'src', 'components', 'AdminDashboard.tsx');

if (!fs.existsSync(adminJs)) {
  console.error('MISSING public/admin/admin.js — run `node scripts/extract-admin.js` first.');
  process.exit(1);
}

try {
  execSync(`node --check "${adminJs}"`, { stdio: 'pipe' });
  console.log(`ADMIN JS: node --check PASS (${fs.statSync(adminJs).size} bytes)`);
} catch (e) {
  console.error('ADMIN JS: node --check FAIL');
  console.error(String(e.stderr || e.message).slice(0, 800));
  process.exit(1);
}

const comp = fs.readFileSync(component, 'utf8');
if (!comp.includes('/admin/admin.js')) {
  console.error('AdminDashboard.tsx does not reference /admin/admin.js');
  process.exit(1);
}
console.log('AdminDashboard.tsx references /admin/admin.js — OK');
