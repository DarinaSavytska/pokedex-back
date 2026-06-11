const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
//   "https://pokedex-front.vercel.app",
  "https://darinasavytska.github.io"
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=2");
    const respons = await fetch("https://pokeapi.co/api/v2/pokemon?offset=2&limit=3");

    const data = await response.json();
    const dat = await respons.json();

    res.status(200).json([...data.results, ...dat.results]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
