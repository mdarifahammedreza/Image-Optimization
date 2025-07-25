import { useState } from "react";
import "./App.css";
import OptimizedImage from "./components/OptimizedImage";
import image from "./../public/test.jpg"
function App() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>🖼️ Image Optimization Comparison</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "40px",
        }}
      >
        {/* Optimized Image from your API */}
        <div style={{ textAlign: "center" }}>
          <h3>🔧 Optimized (via API)</h3>
          <OptimizedImage
            src={image}
            width={400}
            height={300}
            quality={80}
            format="webp"
            alt="Optimized Sample"
            className="rounded"
            priority={true}
          />
        </div>

        {/* Original Image directly from URL */}
        <div style={{ textAlign: "center" }}>
          <h3>🖼️ Original</h3>
          <img
            src={image}
            alt="Original Sample"
            width="400"
            height="300"
            
          />
        </div>
      </div>
    </>
  );
}

export default App;
