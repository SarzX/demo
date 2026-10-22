const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '../public/images');

console.log('--- Generating Fitted T-Shirts for Torso Showcase ---');

// Helper to run bash command
function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString();
  } catch (err) {
    console.error('Command failed:', cmd, err.stderr ? err.stderr.toString() : err.message);
    throw err;
  }
}

// 1. Process White Tee (NoDirectionTee-3.png)
// First let's get the original tee, remove NØRTH text, draw DEMO text
console.log('1. Processing White Tee...');
// In NoDirectionTee-3.png:
// Bbox of text "N Ø R T H" is roughly: x=430 to 650, y=710 to 800
// Color of fabric in that region is roughly #eae7e1
// Let's create clean white tee with DEMO text:
run(`
convert "${PUBLIC}/NoDirectionTee-3.png" \\
  -fill "#eae7e1" -draw "rectangle 420,705 660,760" \\
  -fill "#2b2b2b" -font "Liberation-Sans-Bold" -pointsize 26 -gravity north -annotate +0+712 "D E M O" \\
  /tmp/clean-white-tee.png
`);

// Scale and place onto 1024x1280 canvas matching model-base shoulders
// In model-base.png, shoulders span from x=140 to x=884, collar is at y=318.
// Let's resize clean-white-tee.png to fit perfectly:
// NoDirectionTee-3 bbox is 736x734. If resized to 750x748, it covers shoulders with slight margin.
run(`
convert /tmp/clean-white-tee.png \\
  -crop 736x734+145+321 +repage \\
  -resize 748x746 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-white.png"
`);

// 2. Process Black Tee (biborne.png)
console.log('2. Processing Black Tee...');
// Remove NØRTH text, draw DEMO text in chalk / off-white
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
// Bbox of vibration0 is 667x692+183+435
run(`
convert "${PUBLIC}/vibration0.png" \\
  -crop 667x692+183+435 +repage \\
  -resize 748x776 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-vibration.png"
`);

// 4. Process No Single Tee (model-base-5.png)
console.log('4. Processing No Single Tee...');
// Bbox of model-base-5 is 693x686+168+439
run(`
convert "${PUBLIC}/model-base-5.png" \\
  -crop 693x686+168+439 +repage \\
  -resize 748x741 \\
  -background none -extent 1024x1280-138-316 \\
  "${PUBLIC}/fitted-tee-nosingle.png"
`);

// Also update fitted-tee.png to point to the clean fitted white tee with DEMO
run(`cp "${PUBLIC}/fitted-tee-white.png" "${PUBLIC}/fitted-tee.png"`);

// Now create verification composites on model-base.png
console.log('Generating verification composites on model-base.png...');
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-white.png" -composite "${PUBLIC}/verify-comp-white.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-black.png" -composite "${PUBLIC}/verify-comp-black.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-vibration.png" -composite "${PUBLIC}/verify-comp-vib.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-nosingle.png" -composite "${PUBLIC}/verify-comp-nosingle.png"`);

console.log('--- All fitted tees generated and composited successfully! ---');
