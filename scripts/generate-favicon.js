const fs = require('fs');
const path = require('path');

// Create a simple SVG favicon using the DistroHQ "D" logo style
const faviconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="4" fill="#D8C6A5"/>
  <text x="16" y="22" font-family="serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#080808">D</text>
</svg>`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write favicon.svg
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

// Create a simple ICO-compatible SVG (for modern browsers)
const iconSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" rx="2" fill="#D8C6A5"/>
  <text x="8" y="11" font-family="serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#080808">D</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.svg'), iconSvg);

console.log('Favicon files created successfully!');

