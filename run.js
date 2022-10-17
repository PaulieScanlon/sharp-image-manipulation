const fs = require('fs');
const util = require('util');
const sharp = require('sharp');

const readDir = util.promisify(fs.readdir);
const makeDir = util.promisify(fs.mkdir);

const inputPath = './images';
const outputPath = './slices';

const run = async () => {
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true });
    await makeDir(outputPath);
  } else {
    await makeDir(outputPath);
  }

  const images = await readDir(inputPath);
  const sliceHeight = Math.floor(1280 / images.length);

  images.forEach(async (file, index) => {
    try {
      const top = sliceHeight * index;
      const input = `${inputPath}/${file}`;
      const output = `${outputPath}/${index}.jpg`;

      await sharp(input).extract({ width: 1920, height: sliceHeight, left: 0, top: top }).toFile(output);
    } catch (error) {
      console.error(error);
    }
  });
};

run();
