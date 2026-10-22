const { execSync } = require('child_process');
const path = require('path');

const PUBLIC = '/app/applet/public/images';

console.log('--- Generating Fitted T-Shirts for Torso Showcase ---');

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString();
  } catch (err) {
    console.error('Command failed:', cmd, err.stderr ? err.stderr.toString() : err.message);
    throw err;
  }
}

// 1. Process White Tee (NoDirectionTee-3.png)
console.log('1. Processing White Tee...');
run(`
convert "${PUBLIC}/NoDirectionTee-3.png" \\
  -fill "#eae7e1" -draw "rectangle 420,705 660,760" \\
  -fill "#2b2b2b" -font "Liberation-Sans-Bold" -pointsize 26 -gravity north -annotate +0+712 "D E M O" \\
  /tmp/clean-white-tee.png
`);

run(`
convert /tmp/clean-white-tee.png \\
  -crop 736x734+145+321 +repage \\
  -resize 748x746 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-white.png"
`);

// 2. Process Black Tee (biborne.png)
console.log('2. Processing Black Tee...');
run(`
convert "${PUBLIC}/biborne.png" \\
  -fill "#242527" -draw "rectangle 420,705 660,760" \\
  -fill "#e2ded6" -font "Liberation-Sans-Bold" -pointsize 26 -gravity north -annotate +0+712 "D E M O" \\
  /tmp/clean-black-tee.png
`);

run(`
convert /tmp/clean-black-tee.png \\
  -crop 736x734+145+321 +repage \\
  -resize 748x746 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-black.png"
`);

// 3. Process Vibration Oversized Tee (vibration0.png)
console.log('3. Processing Vibration Tee...');
run(`
convert "${PUBLIC}/vibration0.png" \\
  -crop 667x692+183+435 +repage \\
  -resize 748x776 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-vibration.png"
`);

// 4. Process No Single Tee (model-base-5.png)
console.log('4. Processing No Single Tee...');
run(`
convert "${PUBLIC}/model-base-5.png" \\
  -crop 693x686+168+439 +repage \\
  -resize 748x741 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-nosingle.png"
`);

run(`cp "${PUBLIC}/fitted-tee-white.png" "${PUBLIC}/fitted-tee.png"`);

// Verification composites
console.log('Generating verification composites on model-base.png...');
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-white.png" -composite "${PUBLIC}/verify-comp-white.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-black.png" -composite "${PUBLIC}/verify-comp-black.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-vibration.png" -composite "${PUBLIC}/verify-comp-vib.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-nosingle.png" -composite "${PUBLIC}/verify-comp-nosingle.png"`);

console.log('--- All fitted tees generated and composited successfully! ---');
