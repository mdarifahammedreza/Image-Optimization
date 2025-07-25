

````markdown
# Automatic Image Optimization API

This project provides a high-performance image optimization microservice that supports image resizing, format conversion, and quality tuning. It also includes a frontend demo using a custom `<OptimizedImage />` component to showcase optimized images dynamically.

---

## Features

- 📸 Resize and optimize images on-the-fly
- ⚡ Convert to modern formats (`webp`, `avif`, `jpeg`, `png`)
- 🧠 Caching with Redis for faster repeated access
- 🌐 RESTful API to serve images with query parameters
- 💻 React frontend to preview optimized results and compare originals
- 🛠️ Environment-configurable for flexible deployment

---

## Backend Setup

### Requirements

- Node.js (v18+ recommended)
- Redis server (local or Docker)
- `npm` or `yarn`

### Install

```bash
git clone https://github.com/your-username/image-optimizer-api.git
cd image-optimizer-api
npm install
````

### Configure

Create a `.env` file in the root:

```env
PORT=4000
REDIS_URL=redis://localhost:6379
```

### Run

```bash
npm start
```

### API Endpoint

**GET** `/api/image`

#### Query Parameters:

| Param    | Type   | Required | Description                           |
| -------- | ------ | -------- | ------------------------------------- |
| `url`    | string | ✅        | Publicly accessible image URL         |
| `w`      | number | ❌        | Target width (px)                     |
| `h`      | number | ❌        | Target height (px)                    |
| `q`      | number | ❌        | Quality (1–100), default = 75         |
| `format` | string | ❌        | Format: `webp`, `jpeg`, `png`, `avif` |

#### Example

```bash
http://localhost:4000/api/image?url=https://...&w=400&h=300&q=80&format=webp
```

---

## Frontend (Demo Viewer)

### Tech Stack

* Vite + React 19
* Tailwind CSS (optional)
* Custom `OptimizedImage` component

### Install

```bash
cd client
npm install
```

### Configure

Create a `.env` in the `client/` directory:

```env
VITE_IMAGE_API=http://localhost:4000
```

### Run

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## OptimizedImage Component

```jsx
<OptimizedImage
  src="https://example.com/image.jpg"
  width={400}
  height={300}
  quality={80}
  format="webp"
  alt="Sample Image"
/>
```

This will request the optimized version of the original image using your backend API and render it with proper `alt`, `loading`, and `className` support.

---

## Directory Structure

```
.
├── lib/
│   └── imageProcessor.js     # Sharp-based optimizer
├── cache/
│   └── redis.js              # Redis connection logic
├── client/                   # Frontend app (React + Vite)
│   ├── components/
│   │   └── OptimizedImage.jsx
│   └── App.jsx
├── .env
├── index.js                  # Main API server
└── README.md
```

---

## Deployment Notes

* **Frontend and backend** can be hosted separately.
* Make sure `VITE_IMAGE_API` in the frontend `.env` points to the correct backend endpoint.
* Add CORS middleware if needed for cross-origin requests.

---

## License

MIT

---

## Author

Developed by [Md Arif Ahammed Reza](https://www.linkedin.com/in/md-arif-ahammed-reza/)

- 📧 Email: arifreza.dev@gmail.com  
- 📞 Phone: +8801729318001

