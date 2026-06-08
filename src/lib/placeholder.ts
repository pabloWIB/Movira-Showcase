// Inline SVG poster placeholders (data-URI) shown inside the device mockups
// until the real screen recordings land in public/videos/.
// When the real .mp4 is dropped in, the <video> plays on top and hides the poster.

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function posterDataUri({
  label,
  sub = "Placeholder · suelta el video aquí",
  vertical = false,
}: {
  label: string;
  sub?: string;
  vertical?: boolean;
}) {
  const w = vertical ? 720 : 1280;
  const h = vertical ? 1280 : 800;
  const titleSize = vertical ? 50 : 60;
  const subSize = vertical ? 26 : 26;
  const cy = h / 2 - titleSize * 1.7;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#F4F4F5"/>
  <g font-family="Montserrat, Arial, sans-serif" text-anchor="middle">
    <circle cx="${w / 2}" cy="${cy}" r="${vertical ? 44 : 50}" fill="rgba(0,0,0,0.05)"/>
    <text x="${w / 2}" y="${cy + (vertical ? 16 : 18)}" font-size="${vertical ? 40 : 46}" fill="#0A0A0A">&#9658;</text>
    <text x="${w / 2}" y="${h / 2}" font-size="${titleSize}" font-weight="600" fill="#0A0A0A">${escapeXml(label)}</text>
    <text x="${w / 2}" y="${h / 2 + subSize * 2}" font-size="${subSize}" fill="rgba(0,0,0,0.45)">${escapeXml(sub)}</text>
  </g>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
