import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "instance", "autosphere.json");
fs.mkdirSync(path.dirname(dataPath), { recursive: true });

const cars = [
  ["Mercedes-Benz", "AMG GT 63", "Performance", 2025, 189900, 577, "4.0L V8 Biturbo", "Automatic", "Petrol", "A grand tourer that combines everyday refinement with breathtaking AMG performance.", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85"],
  ["Porsche", "911 Carrera GTS", "Performance", 2025, 171000, 532, "3.6L Flat-6 Hybrid", "PDK Automatic", "Hybrid", "The definitive sports car, tuned for the perfect balance of precision, pace, and usability.", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"],
  ["BMW", "i7 M70", "Electric", 2025, 168500, 650, "Dual Electric Motor", "Automatic", "Electric", "Executive comfort meets silent, instant performance in BMW's flagship electric sedan.", "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85"],
  ["Ferrari", "296 GTB", "Supercar", 2024, 342000, 819, "3.0L V6 Twin-Turbo Hybrid", "7-Speed DCT", "Hybrid", "A compact, mid-engine hybrid that makes supercar performance feel beautifully intuitive.", "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=85"],
  ["Range Rover", "Sport Autobiography", "SUV", 2025, 157600, 626, "4.4L Twin-Turbo V8", "Automatic", "Petrol", "Uncompromising luxury and confident capability for every kind of escape.", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85"],
  ["Audi", "RS e-tron GT", "Electric", 2025, 166000, 637, "Dual Electric Motor", "2-Speed Automatic", "Electric", "Sculpted design and electrifying quattro performance with a serene grand-touring feel.", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85"],
  ["Lamborghini", "Urus SE", "SUV", 2025, 251000, 789, "4.0L V8 Plug-in Hybrid", "8-Speed Automatic", "Hybrid", "The super-SUV evolves with electrified power and unmistakable Lamborghini attitude.", "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85"],
  ["Aston Martin", "DB12", "Grand Tourer", 2025, 245000, 671, "4.0L V8 Twin-Turbo", "8-Speed Automatic", "Petrol", "A modern icon with handcrafted luxury, effortless speed, and a deeply composed ride.", "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"],
  ["Tesla", "Model S Plaid", "Electric", 2024, 89990, 1020, "Tri-Motor Electric", "Single-Speed", "Electric", "Ridiculous acceleration, long-range touring, and an uncompromising technology-first cabin.", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85"],
  ["Bentley", "Bentayga Speed", "SUV", 2025, 219800, 626, "4.0L V8 Twin-Turbo", "8-Speed Automatic", "Petrol", "A serene, hand-finished sanctuary with the pace of a performance car.", "https://images.unsplash.com/photo-1562141961-b6f7a3d4d1f4?auto=format&fit=crop&w=1200&q=85"],
  ["McLaren", "Artura Spider", "Supercar", 2025, 281000, 690, "3.0L V6 Twin-Turbo Hybrid", "8-Speed DCT", "Hybrid", "A lightweight hybrid convertible engineered to make every corner feel like an event.", "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=85"],
  ["Volvo", "EX90 Ultra", "Electric", 2025, 80990, 496, "Dual Electric Motor", "Single-Speed", "Electric", "A thoughtful electric flagship focused on Scandinavian calm, safety, and space.", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85"]
];

const defaultData = {
  cars: cars.map((car, index) => ({
    id: index + 1,
    brand: car[0], model: car[1], category: car[2], year: car[3], price: car[4],
    horsepower: car[5], engine: car[6], transmission: car[7], fuel: car[8],
    description: car[9], image: car[10], rating: 4.7,
  })),
  favorites: [],
};
let store = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8")) : defaultData;
if (!store.cars?.length) store = defaultData;
const save = () => fs.writeFileSync(dataPath, JSON.stringify(store, null, 2));
if (!fs.existsSync(dataPath)) save();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/cars", (req, res) => {
  const { q = "", category = "All", sort = "featured" } = req.query;
  const clauses = [];
  const values = [];
  if (q) {
    clauses.push("(brand LIKE ? OR model LIKE ? OR description LIKE ?)");
    values.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (category !== "All") { clauses.push("category = ?"); values.push(category); }
  const order = sort === "price-low" ? "price ASC" : sort === "price-high" ? "price DESC" : sort === "power" ? "horsepower DESC" : "rating DESC, id ASC";
  const search = String(q).toLowerCase();
  let rows = store.cars.filter((car) => (!search || [car.brand, car.model, car.description].some((value) => value.toLowerCase().includes(search))) && (category === "All" || car.category === category));
  rows = rows.sort((a, b) => order === "price ASC" ? a.price - b.price : order === "price DESC" ? b.price - a.price : order === "horsepower DESC" ? b.horsepower - a.horsepower : b.rating - a.rating);
  const favoriteIds = new Set(store.favorites);
  res.json(rows.map((car) => ({ ...car, favorite: favoriteIds.has(car.id) })));
});

app.get("/api/cars/:id", (req, res) => {
  const car = store.cars.find((item) => item.id === Number(req.params.id));
  if (!car) return res.status(404).json({ error: "Vehicle not found" });
  res.json({ ...car, favorite: store.favorites.includes(car.id) });
});

app.post("/api/favorites/:id", (req, res) => {
  const carId = Number(req.params.id);
  const exists = store.favorites.includes(carId);
  store.favorites = exists ? store.favorites.filter((id) => id !== carId) : [...store.favorites, carId];
  save();
  res.json({ favorite: !exists });
});

app.get("/api/meta", (_req, res) => {
  const counts = store.cars.reduce((result, car) => ({ ...result, [car.category]: (result[car.category] || 0) + 1 }), {});
  res.json({ categories: Object.entries(counts).sort().map(([category, count]) => ({ category, count })), total: store.cars.length });
});

const clientDist = path.join(root, "dist");
app.use(express.static(clientDist));
app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`AutoSphere API running on http://127.0.0.1:${port}`));
