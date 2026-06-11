export default async function handler(req, res) {
    console.log("API route called");
    try {
        // const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        // const data = await response.json();

        // Можеш обробити дані тут: відфільтрувати, об’єднати кілька запитів тощо
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1");
        const respons = await fetch("https://pokeapi.co/api/v2/pokemon?offset=1&limit=1");
        const data = await response.json();
        const dat = await respons.json();
        res.status(200).json([...data.results, ...dat.results]);

        // res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
