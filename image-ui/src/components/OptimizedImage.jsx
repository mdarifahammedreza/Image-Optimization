import React, { useState, useEffect } from "react";

const OptimizedImage = ({ src, width, height, quality = 75, format = "webp", alt = "", className = "", priority = false }) => {
  const [optimizedSrc, setOptimizedSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const apiUrl = new URL("http://localhost:4000/api/image");
    apiUrl.searchParams.append("url", `${window.location.origin}${src}`);
    if (width) apiUrl.searchParams.append("w", width);
    if (height) apiUrl.searchParams.append("h", height);
    apiUrl.searchParams.append("q", quality);
    apiUrl.searchParams.append("format", format);

    setLoading(true);
    setError(false);

    // We don't need to fetch explicitly, just set optimized src for <img> tag
    setOptimizedSrc(apiUrl.toString());
  }, [src, width, height, quality, format]);

  return (
    <>
      {loading && <div className="placeholder" style={{width: width || 100, height: height || 100, backgroundColor: "#eee"}}>Loading...</div>}
      {!error && optimizedSrc && (
        <img
          src={optimizedSrc}
          width={width}
          height={height}
          alt={alt}
          className={className}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          loading={priority ? "eager" : "lazy"}
          style={{ objectFit: "contain" }}
        />
      )}
      {error && <div style={{color: "red"}}>Failed to load image</div>}
    </>
  );
};

export default OptimizedImage;

