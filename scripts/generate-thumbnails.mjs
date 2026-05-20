import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.resolve('public/images');
const OUTPUT_DIR = path.resolve('public/images/thumbs');
const THUMB_SIZE = 400; // px — enough for globe cards
const QUALITY = 70;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(INPUT_DIR).filter(f => 
  /\.(jpg|jpeg|png|webp)$/i.test(f) && !fs.statSync(path.join(INPUT_DIR, f)).isDirectory()
);

console.log(`Processing ${files.length} images → ${THUMB_SIZE}px thumbnails...`);

let done = 0;
for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

  try {
    await sharp(inputPath)
      .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'center' })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
    done++;
    console.log(`  ✓ ${file} → ${baseName}.webp  (${(inputSize/1024).toFixed(0)}KB → ${(outputSize/1024).toFixed(0)}KB, -${savings}%)`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

console.log(`\nDone! ${done}/${files.length} thumbnails generated in public/images/thumbs/`);
