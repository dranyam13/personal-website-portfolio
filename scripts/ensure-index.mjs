import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const indexPath = resolve(process.cwd(), 'index.html');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maynard Ermita — Full-Stack Developer</title>
    <meta name="description" content="Full-Stack Developer & CS Student. I build POS systems, mobile apps, ML-powered tools, and real-world software that ships." />
    <meta name="theme-color" content="#f8fafc" />
    <link rel="canonical" href="/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Maynard Ermita — Full-Stack Developer" />
    <meta property="og:description" content="Full-Stack Developer & CS Student. I build POS systems, mobile apps, ML-powered tools, and real-world software that ships." />
    <meta property="og:url" content="/" />
    <meta property="og:image" content="/menong.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Maynard Ermita — Full-Stack Developer" />
    <meta name="twitter:description" content="Full-Stack Developer & CS Student. I build POS systems, mobile apps, ML-powered tools, and real-world software that ships." />
    <meta name="twitter:image" content="/menong.jpg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

await writeFile(indexPath, html, 'utf8');
console.log('Generated index.html from script.');
