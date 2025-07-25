// lib/imageProcessor.js
const sharp = require("sharp");

const processImage = async (buffer, width, height, format, quality) => {
  const transformer = sharp(buffer).resize({
    width: width ? parseInt(width) : null,
    height: height ? parseInt(height) : null,
    fit: "inside",
  });

  switch (format) {
    case "webp":
    case "jpeg":
    case "png":
    case "avif":
      transformer.toFormat(format, { quality: parseInt(quality) || 75 });
      break;
    default:
      transformer.toFormat("webp", { quality: 75 });
  }

  return await transformer.toBuffer();
};

module.exports = { processImage };
