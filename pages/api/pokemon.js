const allowedOrigins = [
  // "http://localhost:3000",
  // "http://localhost:3001",
  "https://darinasavytska.github.io"
];

export default async function handler(req = 0, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const limit = 25;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${limit * req.query.page}&limit=${limit}`);

    const data = await response.json();

    const fullData = data.results.map((pokemon, idx) => {
      const pokeId = `${idx + 1 + limit * req.query.page}`;
      const pokeNum = (pokeId) => {
        if ((pokeId) < 10) {
          return `00${pokeId}`;
        } else if ((pokeId) < 100) {
          return `0${pokeId}`;
        }

        return `${pokeId}`;
      };

      return {
        name: pokemon.name,
        url: pokemon.url,
        image: `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`,
        miniImage: `https://serebii.net/pokedex-dp/icon/${pokeNum(pokeId)}.gif`
      };
    });

    res.status(200).json(fullData);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch data, error: ${error.message}` });
  }
}
