const { execSync } = require('child_process');

const PUBLIC = '/app/applet/public/images';

function run(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString();
}

console.log('Building pixel-perfect fitted garments for torso showcase...');

// 1. White DEMO Tee
run(`
convert "${PUBLIC}/NoDirectionTee-3.png" \\
  \\( "${PUBLIC}/NoDirectionTee-3.png" -crop 260x46+405+790 +repage \\) -geometry +405+686 -composite \\
  -fill "#262626" -font "Liberation-Sans-Bold" -pointsize 28 -gravity north -annotate +0+694 "D  E  M  O" \\
  /tmp/demo-tee-raw.png
`);

// Scale white tee so collar hits y=316, shoulders span 770px wide (covers base model completely)
// In demo-tee-raw, bbox is 827x852+128+235.
// Let's resize to 770 width: 770/827 = 0.931, height = 793.
// Collar is at y=235 * 0.931 = 219.
// We want collar at y=316, so offset Y = 316 - 219 = 97.
// Center X = 512, width = 770, so offset X = 512 - 770/2 = 127.
run(`
convert /tmp/demo-tee-raw.png \\
  -crop 827x852+128+235 +repage \\
  -resize 770x793 \\
  -background none -extent 1024x1280-127-97 \\
  "${PUBLIC}/fitted-tee-white.png"
`);

// 2. Black DEMO Tee (biborne.png)
run(`
convert "${PUBLIC}/biborne.png" \\
  \\( "${PUBLIC}/biborne.png" -crop 260x46+405+790 +repage \\) -geometry +405+686 -composite \\
  -fill "#dedad2" -font "Liberation-Sans-Bold" -pointsize 28 -gravity north -annotate +0+694 "D  E  M  O" \\
  /tmp/demo-tee-black-raw.png
`);

run(`
convert /tmp/demo-tee-black-raw.png \\
  -crop 827x852+128+235 +repage \\
  -resize 770x793 \\
  -background none -extent 1024x1280-127-97 \\
  "${PUBLIC}/fitted-tee-black.png"
`);

// 3. Vibration Oversized Tee (vibration0.png)
// In vibration0.png, bbox is 667x692+183+435.
// Top collar is at y=435 in crop.
// We want it 770px wide, so 770/667 = 1.154, height = 798.
// Collar is at top of crop, so we place top of crop at y=316!
// Center at X=512, so offset X = 512 - 770/2 = 127.
run(`
convert "${PUBLIC}/vibration0.png" \\
  -crop 667x692+183+435 +repage \\
  -resize 770x798 \\
  -background none -extent 1024x1280-127-316 \\
  "${PUBLIC}/fitted-tee-vibration.png"
`);

// 4. No Single Tee (model-base-5.png)
// In model-base-5.png, bbox is 693x686+168+439.
// Top collar is at y=439 in crop.
// We want it 770px wide, so 770/693 = 1.111, height = 762.
// Top of crop at y=316.
// Center at X=512, offset X = 512 - 770/2 = 127.
run(`
convert "${PUBLIC}/model-base-5.png" \\
  -crop 693x686+168+439 +repage \\
  -resize 770x762 \\
  -background none -extent 1024x1280-127-316 \\
  "${PUBLIC}/fitted-tee-nosingle.png"
`);

// Default fitted-tee.png
run(`cp "${PUBLIC}/fitted-tee-white.png" "${PUBLIC}/fitted-tee.png"`);

// Generate composites on model-base.png to test
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-white.png" -composite "${PUBLIC}/verify-comp-white.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-black.png" -composite "${PUBLIC}/verify-comp-black.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-vibration.png" -composite "${PUBLIC}/verify-comp-vib.png"`);
run(`convert "${PUBLIC}/model-base.png" "${PUBLIC}/fitted-tee-nosingle.png" -composite "${PUBLIC}/verify-comp-nosingle.png"`);

console.log('Composites created!');
