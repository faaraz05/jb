const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'public/hero',
  'public/images',
  'public/images/products',
  'public/images/owners',
  'public/logos',
];
dirs.forEach(d => fs.mkdirSync(path.join(process.cwd(), d), { recursive: true }));

// Helper to create product SVG
function createProductSvg(title, subtitle, coreColor, accentBadge, dimensions = '2440 × 1220 mm') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5E8"/>
      <stop offset="50%" stop-color="#EEDEB8"/>
      <stop offset="100%" stop-color="#DFCB9C"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8A6428"/>
      <stop offset="50%" stop-color="#D9B66A"/>
      <stop offset="100%" stop-color="#B8893A"/>
    </linearGradient>
    <linearGradient id="woodLayers" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8C4A2F"/>
      <stop offset="25%" stop-color="#6F3922"/>
      <stop offset="50%" stop-color="#A25B3C"/>
      <stop offset="75%" stop-color="#5A3E26"/>
      <stop offset="100%" stop-color="#8C4A2F"/>
    </linearGradient>
    <pattern id="grain" width="120" height="20" patternUnits="userSpaceOnUse">
      <path d="M0 10 Q30 5 60 10 T120 10" stroke="#7A5A1E" stroke-width="0.75" fill="none" opacity="0.25"/>
      <path d="M0 15 Q30 20 60 15 T120 15" stroke="#7A5A1E" stroke-width="0.5" fill="none" opacity="0.2"/>
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  <rect width="800" height="600" fill="url(#grain)"/>

  <!-- Gold Frame Border -->
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="32" y="32" width="736" height="536" fill="none" stroke="#D9B66A" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>

  <!-- Plywood Sheet Isometric / Layered Graphic -->
  <g transform="translate(140, 110)">
    <!-- Shadow -->
    <polygon points="40,240 480,240 540,190 100,190" fill="#2B1D10" opacity="0.15"/>
    
    <!-- Stack of Plywood Panels -->
    <!-- Bottom Layers -->
    <path d="M30 220 L450 220 L500 170 L80 170 Z" fill="#C2A478" stroke="#5A3E26" stroke-width="1.5"/>
    <!-- Core Plies Layer 1 -->
    <path d="M30 220 L450 220 L450 228 L30 228 Z" fill="${coreColor}" stroke="#5A3E26" stroke-width="1"/>
    <!-- Middle Core Layer -->
    <path d="M25 210 L445 210 L495 160 L75 160 Z" fill="#D4B98E" stroke="#5A3E26" stroke-width="1.5"/>
    <path d="M25 210 L445 210 L445 218 L25 218 Z" fill="${coreColor}" stroke="#5A3E26" stroke-width="1"/>
    
    <!-- Top Main Sheet Face -->
    <path d="M20 190 L440 190 L490 140 L70 140 Z" fill="#E8D5B5" stroke="url(#gold)" stroke-width="2"/>
    <!-- Top Face Grain lines -->
    <path d="M60 175 Q200 160 450 175" stroke="#7A5A1E" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M80 160 Q260 148 470 160" stroke="#7A5A1E" stroke-width="0.8" fill="none" opacity="0.3"/>
    <path d="M100 150 Q300 140 480 150" stroke="#7A5A1E" stroke-width="0.8" fill="none" opacity="0.3"/>

    <!-- Calibrated Cross Section Edge -->
    <path d="M20 190 L440 190 L440 204 L20 204 Z" fill="url(#woodLayers)" stroke="#5A3E26" stroke-width="1.5"/>
    <path d="M440 190 L490 140 L490 154 L440 204 Z" fill="#5A3E26" stroke="#2B1D10" stroke-width="1"/>
    
    <!-- ISI / Certification stamp overlay -->
    <g transform="translate(180, 148) rotate(-5)">
      <rect x="0" y="0" width="110" height="34" rx="4" fill="none" stroke="#8C4A2F" stroke-width="1.5" stroke-dasharray="3 1.5"/>
      <text x="55" y="16" font-family="'Cinzel', serif, Arial" font-size="9" font-weight="bold" fill="#8C4A2F" text-anchor="middle" letter-spacing="1">JB TIMBER TECH</text>
      <text x="55" y="27" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#8C4A2F" text-anchor="middle">${accentBadge}</text>
    </g>
  </g>

  <!-- Typography & Card Info Header -->
  <g transform="translate(60, 430)">
    <!-- Gold accent rule -->
    <line x1="0" y1="0" x2="680" y2="0" stroke="url(#gold)" stroke-width="1.5"/>
    
    <text x="0" y="38" font-family="'Cinzel', serif, 'Times New Roman'" font-size="28" font-weight="600" fill="#5A3E26" letter-spacing="1.5">
      ${title.toUpperCase()}
    </text>
    <text x="0" y="70" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-style="italic" fill="#7A5A1E">
      ${subtitle}
    </text>
    <text x="680" y="55" font-family="'Jost', Arial, sans-serif" font-size="14" font-weight="600" fill="#5A3E26" text-anchor="end" letter-spacing="1.5">
      ${dimensions}
    </text>
  </g>
</svg>`;
}

// Generate Product Images
const products = [
  { file: 'okuma.svg', title: 'Semi Hardwood Okuma', subtitle: 'UF Resin Bonded · Okuma Face Veneer', core: '#A47551', badge: 'SEMI-HARDWOOD' },
  { file: 'gurjan-semi.svg', title: 'Semi Hardwood Gurjan', subtitle: 'UF Resin Bonded · Gurjan Face Veneer', core: '#8F5E39', badge: 'GURJAN FACE' },
  { file: 'alternate-gurjan.svg', title: 'Alternate Plywood', subtitle: 'BWR Grade · MUF Glue · Gurjan Face Dipped', core: '#8C4A2F', badge: 'BWR GRADE' },
  { file: 'full-red.svg', title: 'Full Red Plywood', subtitle: '100% Red Hardwood Core · Dipped Gurjan', core: '#8C4A2F', badge: 'FULL RED CORE' },
  { file: 'isi-303.svg', title: 'Full Hardwood ISI 303', subtitle: 'BWR Grade · Melamine Bonded · Gurjan Dipped', core: '#7A3F29', badge: 'ISI 303' },
  { file: 'isi-710.svg', title: 'Full Hardwood ISI 710', subtitle: 'Marine Grade · Phenol Formaldehyde Bonded', core: '#5D2B19', badge: 'ISI 710 MARINE' },
  { file: 'film-faced.svg', title: 'Film Faced (Shuttering)', subtitle: 'Phenolic Mirror Film · 34kg / 30kg / 24kg', core: '#2B1D10', badge: 'SHUTTERING 12MM' },
];

products.forEach(p => {
  fs.writeFileSync(path.join('public/images/products', p.file), createProductSvg(p.title, p.subtitle, p.core, p.badge));
});

// Generate Hero Manufacturing Poster SVG
const heroPosterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="100%" height="100%">
  <defs>
    <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2B1D10"/>
      <stop offset="50%" stop-color="#3D2917"/>
      <stop offset="100%" stop-color="#1F140B"/>
    </linearGradient>
    <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8A6428"/>
      <stop offset="38%" stop-color="#D9B66A"/>
      <stop offset="52%" stop-color="#F0D894"/>
      <stop offset="74%" stop-color="#B8893A"/>
      <stop offset="100%" stop-color="#8A6428"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="800" fill="url(#darkBg)"/>
  
  <!-- Outer Gold Frame -->
  <rect x="30" y="30" width="1220" height="740" fill="none" stroke="url(#goldFoil)" stroke-width="2"/>
  <rect x="42" y="42" width="1196" height="716" fill="none" stroke="#B8893A" stroke-width="1" stroke-dasharray="6 6" opacity="0.5"/>

  <!-- Manufacturing Art Illustration -->
  <g transform="translate(640, 360)">
    <!-- Concentric timber rings representing Tree to Panel -->
    <circle r="220" fill="none" stroke="#D9B66A" stroke-width="1" opacity="0.2"/>
    <circle r="180" fill="none" stroke="#B8893A" stroke-width="1.5" opacity="0.3"/>
    <circle r="140" fill="none" stroke="#D9B66A" stroke-width="1" stroke-dasharray="8 4" opacity="0.4"/>
    <circle r="100" fill="none" stroke="#D9B66A" stroke-width="2" opacity="0.6"/>

    <!-- Tree Symbol in Gold -->
    <path d="M0 -75 L25 -30 L15 -30 L35 15 L20 15 L45 60 L-45 60 L-20 15 L-35 15 L-15 -30 L-25 -30 Z" fill="url(#goldFoil)"/>
    <rect x="-6" y="60" width="12" height="24" fill="#B8893A"/>

    <!-- Calibrated plies below tree -->
    <g transform="translate(-180, 120)">
      <rect x="0" y="0" width="360" height="12" rx="2" fill="#8C4A2F" stroke="#D9B66A" stroke-width="1"/>
      <rect x="0" y="16" width="360" height="12" rx="2" fill="#B8893A" stroke="#D9B66A" stroke-width="1"/>
      <rect x="0" y="32" width="360" height="12" rx="2" fill="#8C4A2F" stroke="#D9B66A" stroke-width="1"/>
      <rect x="0" y="48" width="360" height="12" rx="2" fill="#5A3E26" stroke="#D9B66A" stroke-width="1"/>
    </g>
  </g>

  <!-- Title & Branding -->
  <text x="640" y="620" font-family="'Cinzel', serif" font-size="36" font-weight="600" fill="url(#goldFoil)" text-anchor="middle" letter-spacing="4">
    JB TIMBER TECH SOLUTIONS
  </text>
  <text x="640" y="660" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" font-style="italic" fill="#E6D9BC" text-anchor="middle" letter-spacing="1">
    From Tree to Calibrated Panel · Factory-Direct Precision
  </text>
</svg>`;
fs.writeFileSync('public/hero/poster.svg', heroPosterSvg);

// Generate Factory Illustration SVG
const factorySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="facBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5EFE0"/>
      <stop offset="100%" stop-color="#E6D9BC"/>
    </linearGradient>
    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8A6428"/>
      <stop offset="50%" stop-color="#D9B66A"/>
      <stop offset="100%" stop-color="#B8893A"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#facBg)"/>
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#goldAccent)" stroke-width="2"/>
  
  <!-- Architectural Factory Silhouette -->
  <g transform="translate(100, 160)" stroke="#5A3E26" stroke-width="2" fill="none">
    <!-- Factory Roofline -->
    <path d="M0 240 L0 100 L120 40 L120 100 L240 40 L240 100 L360 40 L360 100 L480 40 L480 240 Z" fill="#FBF8EF"/>
    
    <!-- Industrial Chimney & Thermal Press Silhouette -->
    <rect x="500" y="0" width="40" height="240" fill="#E6D9BC"/>
    <line x1="490" y1="20" x2="550" y2="20" stroke="url(#goldAccent)" stroke-width="3"/>

    <!-- Windows / Glass Panes -->
    <g fill="#E6D9BC" stroke="#5A3E26" stroke-width="1.5">
      <rect x="40" y="120" width="40" height="40"/>
      <rect x="160" y="120" width="40" height="40"/>
      <rect x="280" y="120" width="40" height="40"/>
      <rect x="400" y="120" width="40" height="40"/>
      <rect x="40" y="180" width="40" height="40"/>
      <rect x="160" y="180" width="40" height="40"/>
      <rect x="280" y="180" width="40" height="40"/>
      <rect x="400" y="180" width="40" height="40"/>
    </g>
    <!-- Rollers / Plywood Pressing Machine -->
    <circle cx="200" cy="280" r="24" fill="#B8893A"/>
    <circle cx="280" cy="280" r="24" fill="#B8893A"/>
    <circle cx="360" cy="280" r="24" fill="#B8893A"/>
    <line x1="120" y1="280" x2="440" y2="280" stroke="#8C4A2F" stroke-width="8"/>
  </g>

  <text x="400" y="510" font-family="'Cinzel', serif" font-size="22" font-weight="600" fill="#5A3E26" text-anchor="middle" letter-spacing="2">
    MANUFACTURING FACILITY
  </text>
  <text x="400" y="540" font-family="'Cormorant Garamond', Georgia, serif" font-size="16" font-style="italic" fill="#7A5A1E" text-anchor="middle">
    High-Pressure Thermal Presses &amp; Precision Calibration Lines
  </text>
</svg>`;
fs.writeFileSync('public/images/factory.svg', factorySvg);

// Generate Owners SVG
function createOwnerSvg(initials, name, role) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8A6428"/>
      <stop offset="50%" stop-color="#D9B66A"/>
      <stop offset="100%" stop-color="#B8893A"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#FBF8EF"/>
  <rect x="16" y="16" width="368" height="468" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="24" y="24" width="352" height="452" fill="none" stroke="#E6D9BC" stroke-width="1"/>
  
  <!-- Silhouette circle -->
  <circle cx="200" cy="180" r="90" fill="#E6D9BC" stroke="url(#gold)" stroke-width="2"/>
  
  <!-- Stylized Monogram Avatar -->
  <text x="200" y="205" font-family="'Cinzel', serif" font-size="64" font-weight="600" fill="#5A3E26" text-anchor="middle">
    ${initials}
  </text>
  
  <line x1="80" y1="310" x2="320" y2="310" stroke="url(#gold)" stroke-width="1.5"/>
  <text x="200" y="360" font-family="'Cinzel', serif" font-size="20" font-weight="600" fill="#5A3E26" text-anchor="middle" letter-spacing="1">
    ${name}
  </text>
  <text x="200" y="390" font-family="'Jost', sans-serif" font-size="13" font-weight="600" fill="#7A5A1E" text-anchor="middle" letter-spacing="1.5">
    ${role.toUpperCase()}
  </text>
</svg>`;
}
fs.writeFileSync('public/images/owners/owner-1.svg', createOwnerSvg('MD', 'MANAGING DIRECTOR', 'Executive Leadership'));
fs.writeFileSync('public/images/owners/owner-2.svg', createOwnerSvg('DO', 'DIRECTOR — OPERATIONS', 'Manufacturing & Supply'));

// Generate Partner / Client Logos
const partnerNames = [
  'DECCAN TIMBERS',
  'MALABAR PLY',
  'CHOLA HARDWOODS',
  'KERALA TIMBER MERCHANTS',
  'TAMILNADU WOODWORKS',
  'SOUTHERN CORP SUPPLY',
];

partnerNames.forEach((name, i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
    <rect width="240" height="80" fill="transparent"/>
    <rect x="8" y="8" width="224" height="64" rx="4" fill="none" stroke="#7A5A1E" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
    <text x="120" y="46" font-family="'Cinzel', serif" font-size="13" font-weight="600" fill="#5A3E26" text-anchor="middle" letter-spacing="1.5">
      ${name}
    </text>
  </svg>`;
  fs.writeFileSync(`public/logos/partner-${i + 1}.svg`, svg);
});

console.log('All SVG assets generated successfully!');

