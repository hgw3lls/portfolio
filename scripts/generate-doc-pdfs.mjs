import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(root, 'public', 'docs');

const documents = {
  'tony-yanick-cv.pdf': [
    'Tony Yanick — Curriculum Vitae',
    'Education, selected works, research, teaching, and institutional materials.',
  ],
  'tony-yanick-artist-statement.pdf': [
    'Tony Yanick — Artist Statement',
    'Fiction as an operational structure for image, sound, code, and space.',
  ],
  'tony-yanick-research-statement.pdf': [
    'Tony Yanick — Research Statement',
    'Limits of CTRL: Neural Bending and the Generic Machine.',
  ],
  'tony-yanick-teaching-portfolio.pdf': [
    'Tony Yanick — Teaching Portfolio',
    'Systems-based, cross-disciplinary media pedagogy.',
  ],
  'teaching-portfolio.pdf': [
    'Tony Yanick — Teaching Portfolio',
    'Programming for digital art, media systems, and interdisciplinary pedagogy.',
  ],
  'fictional-worlds-possible-futures.pdf': [
    'Fictional Worlds / Possible Futures — Example Syllabus',
    'Collaborative world-building studio for shared conditions, platforms, archives, and participatory activation.',
  ],
  'tony-yanick-project-documentation.pdf': [
    'Tony Yanick — Project Documentation Packet',
    'Selected works and installation documentation index.',
  ],
  'hypnagnosis-documentation.pdf': [
    'HYPNAGNOSIS — Project Documentation',
    'Risograph works, altered states, sleep paralysis, liminal perception.',
  ],
  'cosmomorphosis-documentation.pdf': [
    'COSMOMORPHOSIS — Project Documentation',
    'Generative audiovisual installation driven by ISS telemetry.',
  ],
  'transmissions-documentation.pdf': [
    'TRANSMISSIONS — Project Documentation',
    'Speculative pirate-radio system, voice, hip-hop, spoken word, science fiction.',
  ],
  'shape-of-a-packet-documentation.pdf': [
    'SHAPE OF A PACKET — Project Documentation',
    'Networked participatory installation and distributed media archive.',
  ],
  'n2-the-secretary-documentation.pdf': [
    'N2: THE SECRETARY — Project Documentation',
    'Language, signal, fictional archive, synthetic media.',
  ],
  'artificial-cinema-documentation.pdf': [
    'ARTIFICIAL CINEMA — Project Documentation',
    'Computational audiovisual environment and operative AI media system.',
  ],
  'podkop-documentation.pdf': [
    'PODKOP — Project Documentation',
    'AI-driven urban fiction platform and participatory infrastructure.',
  ],
  'variation-79-podkop-documentation.pdf': [
    'VARIATION 79 / PODKOP — Project Documentation',
    'Experimental audiovisual works, repetition, recursion, mediated memory.',
  ],

  'the-fixers-naudia-loftis-documentation.pdf': [
    'The Fixers: Naudia Loftis — Project Documentation',
    'Collaborative documentary film centered on community organizing in Cleveland.',
  ],
  'make-america-great-again-and-again-documentation.pdf': [
    'Make America Great Again ... And Again — Project Documentation',
    'Experimental video work, political language, speculative fiction, and montage.',
  ],
  'surface-documentation.pdf': [
    'surFACE — Project Documentation',
    'Short film from TAPEHEADS investigating analog recording, drawing, and feedback.',
  ],
  'flow-lines-documentation.pdf': [
    'Flow Lines (3-channel video) — Project Documentation',
    'Collaborative three-channel video on landscape, migration, memory, and the Niagara River.',
  ],
  'bobbi-lynn-documentation.pdf': [
    'BOBBI LYNN — Project Documentation',
    'Music video exploring memory, family archive, and generative image systems.',
  ],
  'dossier-37-documentation.pdf': [
    'Dossier 37 — Project Documentation',
    'Audiovisual work with AUDINT on sonic warfare, disinformation, and forensic visualization.',
  ],
  'systems-based-media-studio.pdf': [
    'Systems-based Media Studio — Teaching Material',
    'Course framework for image, sound, code, archive, and spatial systems.',
  ],
  'computational-media-environment.pdf': [
    'Computational Media as Environment — Teaching Material',
    'Workshop on computational systems, feedback, constraints, and media literacy.',
  ],
  'analog-digital-publication-systems.pdf': [
    'Analog / Digital Publication Systems — Teaching Material',
    'Hybrid print, risograph, typography, sequencing, and network distribution.',
  ],
};

const sanitize = (value) =>
  value
    .replaceAll('—', '-')
    .replaceAll('–', '-')
    .replaceAll('·', '-')
    .replaceAll('“', '"')
    .replaceAll('”', '"')
    .replaceAll('’', "'")
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)');

const makePdf = (lines) => {
  const content = ['BT', '/F1 18 Tf', '72 740 Td'];

  lines.forEach((line, index) => {
    if (index > 0) {
      content.push('0 -28 Td');
      content.push('/F1 11 Tf');
    }
    content.push(`(${sanitize(line)}) Tj`);
  });

  content.push('ET');
  const stream = Buffer.from(content.join('\n'), 'latin1');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream.toString('latin1')}\nendstream`,
  ];

  const chunks = ['%PDF-1.4\n'];
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(chunks.join(''), 'latin1'));
    chunks.push(`${index + 1} 0 obj\n${object}\nendobj\n`);
  });

  const xrefOffset = Buffer.byteLength(chunks.join(''), 'latin1');
  chunks.push(`xref\n0 ${objects.length + 1}\n`);
  chunks.push('0000000000 65535 f \n');
  offsets.slice(1).forEach((offset) => {
    chunks.push(`${String(offset).padStart(10, '0')} 00000 n \n`);
  });
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return Buffer.from(chunks.join(''), 'latin1');
};

await mkdir(outputDir, { recursive: true });

await Promise.all(
  Object.entries(documents).map(([fileName, lines]) =>
    writeFile(join(outputDir, fileName), makePdf(lines)),
  ),
);

console.log(`Generated ${Object.keys(documents).length} PDF documents in public/docs`);
