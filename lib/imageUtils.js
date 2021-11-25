const sharp = require("sharp");

async function resize(fileBuffer, length, width) {
  return await sharp(fileBuffer)
    .resize(parseInt(width), parseInt(length), {
      fit: 'fill',
    })
    .toBuffer();
}

async function rotate(fileBuffer, degrees = 0) {
  return await sharp(fileBuffer)
    .rotate(parseInt(degrees))
    .toBuffer();
}

async function convert(fileBuffer, type) {
  const supportedTypes = ['heic', 'heif', 'jpeg', 'jpg', 'png', 'raw', 'tiff', 'webp']

  if (supportedTypes.includes(type)) {
    const newFilename = `converted.${type}`
    return await sharp(fileBuffer)
      .toFormat(type)
      .toBuffer(`data/${newFilename}`);
  }

  return fileBuffer
}

async function grayscale(fileBuffer) {
  return await sharp(fileBuffer)
    .grayscale()
    .toBuffer();
}

async function negative(fileBuffer) {
  return await sharp(fileBuffer)
    .negate()
    .toBuffer();
}

async function save(fileBuffer, filename) {
  await sharp(fileBuffer)
    .toFile(`data/${filename}`);
}

module.exports = { resize, rotate, convert, save, grayscale, negative }