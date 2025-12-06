# DistroHQ - Next.js 15 Production App

A production-ready Next.js 15 application with Tailwind CSS v3, SEO optimization, and Lucide icon favicon.

## Features

- ✅ Next.js 15 with App Router
- ✅ Tailwind CSS v3
- ✅ Comprehensive SEO meta tags
- ✅ Lucide icon favicon
- ✅ TypeScript support
- ✅ Production-ready configuration

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
distrohq/
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx         # Home page component
│   ├── globals.css      # Global styles with Tailwind
│   └── icon.svg         # Favicon (Lucide icon)
├── public/
│   ├── favicon.svg      # Favicon SVG
│   ├── apple-touch-icon.svg
│   └── site.webmanifest # Web manifest
├── scripts/
│   └── generate-icons.js # Icon generation script
└── package.json
```

## SEO Features

The app includes comprehensive SEO meta tags:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured metadata
- Canonical URLs
- Robots directives

## Icons

The favicon uses a Lucide-inspired icon (LayoutTemplate style) that matches the DistroHQ brand aesthetic.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: npm

## License

© 2025 DistroHQ Systems

