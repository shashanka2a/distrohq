const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create favicon.ico as SVG (modern browsers support SVG favicons)
// Using a simplified version of the LayoutTemplate icon from Lucide
const faviconSvg = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="4" fill="#D8C6A5"/>
  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
</svg>`;

// Write favicon.svg (Next.js 15 supports SVG favicons)
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

// Create apple-touch-icon (180x180)
const appleIconSvg = `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="4" fill="#D8C6A5"/>
  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#080808" stroke-width="1.5" fill="none"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleIconSvg);

// Create site.webmanifest
const manifest = {
  name: 'DistroHQ',
  short_name: 'DistroHQ',
  description: 'Effortless Content for the Ambitious',
  icons: [
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml'
    },
    {
      src: '/apple-touch-icon.svg',
      sizes: '180x180',
      type: 'image/svg+xml'
    }
  ],
  theme_color: '#D8C6A5',
  background_color: '#050505',
  display: 'standalone',
  start_url: '/'
};

fs.writeFileSync(
  path.join(publicDir, 'site.webmanifest'),
  JSON.stringify(manifest, null, 2)
);

console.log('Icon files created successfully!');

