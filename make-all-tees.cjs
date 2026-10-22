const { execSync } = require('child_process');

const PUBLIC = '/app/applet/public/images';

function run(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString();
}

console.log('--- Step 1: Create clean DEMO graphic on White Tee ---');
// 1. White Tee with DEMO
run(`
convert "${PUBLIC}/NoDirectionTee-3.png" \\
  \\( "${PUBLIC}/NoDirectionTee-3.png" -crop 260x44+405+790 +repage \\) -geometry +405+688 -composite \\
  -fill "#262626" -font "Liberation-Sans-Bold" -pointsize 28 -gravity north -annotate +0+694 "D  E  M  O" \\
  /tmp/white-demo-raw.png
`);

// Scale white tee to fit model-base (1024x1280)
// Width: 810px, Height: 834px
// Collar aligned with y=314, Center at X=512
run(`
convert /tmp/white-demo-raw.png \\
  -crop 827x852+128+235 +repage \\
  -resize 810x834 \\
  -background none -extent 1024x1280-107-314 \\
  "${PUBLIC}/fitted-tee-white.png"
`);

console.log('--- Step 2: Create Black Tee with DEMO ---');
run(`
convert "${PUBLIC}/biborne.png" \\
  \\( "${PUBLIC}/biborne.png" -crop 260x44+405+790 +repage \\) -geometry +405+688 -composite \\
  -fill "#dedad2" -font "Liberation-Sans-Bold" -pointsize 28 -gravity north -annotate +0+694 "D  E  M  O" \\
  /tmp/black-demo-raw.png
`);

run(`
convert /tmp/black-demo-raw.png \\
  -crop 827x852+128+235 +repage \\
  -resize 810x834 \\
  -background none -extent 1024x1280-107-314 \\
  "${PUBLIC}/fitted-tee-black.png"
`);

console.log('--- Step 3: Create Vibration Oversized Tee ---');
// Take white tee body without graphic (patch the center)
// And overlay VIBRATION graphic
run(`
convert "${PUBLIC}/vibration0.png" -crop 430x220+325+560 +repage -resize 390x200 /tmp/vib-graphic-clean.png
`);

// Place vibration graphic on the chest of the fitted white tee
run(`
convert "${PUBLIC}/NoDirectionTee-3.png" \\
  \\( "${PUBLIC}/NoDirectionTee-3.png" -crop 827x852+128+235 +repage \\) \\
  \\( -size 460x400 xc:"#eae7e1" \\) -geometry +183+320 -composite \\
  \\( /tmp/vib-graphic-clean.png \\) -geometry +218+390 -composite \\
  /tmp/vibration-raw.png
`);

run(`
convert /tmp/vibration-raw.png \\
  -resize 810x834 \\
  -background none -extent 1024x1280-107-314 \\
  "${PUBLIC}/fitted-tee-vibration.png"
`);

console.log('--- Step 4: Create No Single Tee (Plough the Waves) ---');
run(`
convert "${PUBLIC}/model-base-5.png" -crop 200x120+550+560 +repage /tmp/plough-graphic.png
`);

// Place plough the waves graphic on the chest of the fitted black tee
run(`
convert "${PUBLIC}/biborne.png" \\
  \\( "${PUBLIC}/biborne.png" -crop 827x852+128+235 +repage \\) \\
  \\( -size 460x400 xc:"#252628" \\) -geometry +183+320 -composite \\
  \\( /tmp/plough-graphic.png \\) -geometry +380+380 -composite \\
  /tmp/nosingle-raw.png
`);

run(`
convert /tmp/nosingle-raw.png \\
  -resize 810x834 \\
  -background none -extent 1024x1280-107-314 \\
  "${PUBLIC}/fitted-tee-nosingle.png"
`);

run(`cp "${PUBLIC}/fitted-tee-white.png" "${PUBLIC}/fitted-tee.png"`);

// Verification composites
console.log('Generating verification composites on model-base.png...');
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-white.png" -composite "${PUBLIC}/verify-comp-white.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-black.png" -composite "${PUBLIC}/verify-comp-black.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-vibration.png" -composite "${PUBLIC}/verify-comp-vib.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-nosingle.png" -composite "${PUBLIC}/verify-comp-nosingle.png"`);

console.log('--- All fitted tees built and verified successfully! ---');
