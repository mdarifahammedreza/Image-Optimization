require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { processImage } = require("./lib/imageProcessor");
const redis = require("./cache/redis");

const app = express();
const port = process.env.PORT || 4000;
const CACHE_TTL = process.env.IMAGE_CACHE_TTL ? parseInt(process.env.IMAGE_CACHE_TTL) : 3600;

app.get("/api/image", async (req, res) => {
  const { url, w, h, q, format = "webp" } = req.query;
console.log(`Orginal Url ${url}`)
  if (!url) {
    return res.status(400).send("Missing 'url' parameter");
  }

  const width = w ? parseInt(w) : null;
  const height = h ? parseInt(h) : null;
  const quality = q ? parseInt(q) : 75;

  const cacheKey = `${url}_${width || "auto"}_${height || "auto"}_${quality}_${format}`;

  try {
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("From Redis cache");
      res.setHeader("Content-Type", `image/${format}`);
      return res.send(Buffer.from(cached, "base64"));
    }

    const imageRes = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(imageRes.data, "binary");

    const optimized = await processImage(buffer, width, height, format, quality);

    await redis.set(cacheKey, optimized.toString("base64"), "EX", CACHE_TTL);

    res.setHeader("Content-Type", `image/${format}`);
    res.send(optimized);
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).send("Image processing failed");
  }
});
app.get('/', (req, res) => {
  res.send('Server Running');
});
app.listen(port, () => {
  console.log(`Image API running at http://localhost:${port}`);
});
