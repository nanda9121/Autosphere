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
  ["Range Rover", "Sport Autobiography", "SUV", 2025, 157600, 626, "4.4L Twin-Turbo V8", "Automatic", "Petrol", "Uncompromising luxury and confident capability for every kind of escape.", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85", "Land Rover Range Rover Sport Autobiography", "Autobiography"],
  ["Audi", "RS e-tron GT", "Electric", 2025, 166000, 637, "Dual Electric Motor", "2-Speed Automatic", "Electric", "Sculpted design and electrifying quattro performance with a serene grand-touring feel.", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85"],
  ["Lamborghini", "Urus SE", "SUV", 2025, 251000, 789, "4.0L V8 Plug-in Hybrid", "8-Speed Automatic", "Hybrid", "The super-SUV evolves with electrified power and unmistakable Lamborghini attitude.", "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85"],
  ["Aston Martin", "DB12", "Grand Tourer", 2025, 245000, 671, "4.0L V8 Twin-Turbo", "8-Speed Automatic", "Petrol", "A modern icon with handcrafted luxury, effortless speed, and a deeply composed ride.", "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85", "Aston Martin DB12", "DB12", "Volante"],
  ["Tesla", "Model S Plaid", "Electric", 2024, 89990, 1020, "Tri-Motor Electric", "Single-Speed", "Electric", "Ridiculous acceleration, long-range touring, and an uncompromising technology-first cabin.", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85"],
  ["Bentley", "Bentayga Speed", "SUV", 2025, 219800, 626, "4.0L V8 Twin-Turbo", "8-Speed Automatic", "Petrol", "A serene, hand-finished sanctuary with the pace of a performance car.", "https://images.unsplash.com/photo-1562141961-b6f7a3d4d1f4?auto=format&fit=crop&w=1200&q=85"],
  ["McLaren", "Artura Spider", "Supercar", 2025, 281000, 690, "3.0L V6 Twin-Turbo Hybrid", "8-Speed DCT", "Hybrid", "A lightweight hybrid convertible engineered to make every corner feel like an event.", "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=85"],
  ["Volvo", "EX90 Ultra", "Electric", 2025, 80990, 496, "Dual Electric Motor", "Single-Speed", "Electric", "A thoughtful electric flagship focused on Scandinavian calm, safety, and space.", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85"]
  ,["Mercedes-Benz", "G 580 with EQ Technology", "Electric", 2025, 161500, 579, "Quad Electric Motor", "Single-Speed", "Electric", "The unmistakable G-Class silhouette meets near-silent torque and serious all-terrain confidence.", "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=85"],
  ["Porsche", "Cayenne Turbo GT", "SUV", 2025, 196300, 650, "4.0L V8 Twin-Turbo", "8-Speed Tiptronic", "Petrol", "A road-focused SUV with sports-car responses, track-ready brakes, and room for the whole weekend.", "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"],
  ["BMW", "M4 Competition xDrive", "Performance", 2025, 101100, 523, "3.0L Twin-Turbo I6", "8-Speed Automatic", "Petrol", "A precise coupe with muscular design, all-weather traction, and a driver-first cockpit.", "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85"],
  ["Chevrolet", "Corvette Z06", "Supercar", 2025, 112700, 670, "5.5L Flat-Plane V8", "8-Speed DCT", "Petrol", "American performance engineering distilled into a naturally aspirated, mid-engine icon.", "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85"],
  ["Lucid", "Air Sapphire", "Electric", 2025, 249900, 1234, "Tri-Motor Electric", "Single-Speed", "Electric", "An electric grand tourer with extraordinary power, long-range composure, and a calm cabin.", "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85"],
  ["Maserati", "GranTurismo Folgore", "Grand Tourer", 2025, 190000, 751, "Tri-Motor Electric", "Single-Speed", "Electric", "Italian grand touring character with a sculpted body and instant electric performance.", "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85", "Maserati GranTurismo Folgore", "Folgore"],
  ["Toyota", "GR Supra 3.0", "Performance", 2025, 56750, 382, "3.0L Turbo I6", "6-Speed Manual", "Petrol", "A compact sports car that rewards commitment with direct steering and an engaging manual option.", "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=85"],
  ["Rivian", "R1S Quad-Motor", "SUV", 2025, 94900, 835, "Quad Electric Motor", "Single-Speed", "Electric", "A family-sized adventure vehicle with serious off-road hardware and three rows of space.", "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=85"]
];

const detailsFor = (car) => {
  const [brand, model, category, year, price, horsepower, engine, transmission, fuel, description, image] = car;
  const electric = fuel === "Electric";
  const hybrid = fuel === "Hybrid";
  return {
    id: 0, brand, model, category, year, price, horsepower, engine, transmission, fuel, description, image,
    rating: 4.7,
    acceleration: horsepower > 700 ? "2.8 sec" : horsepower > 500 ? "3.5 sec" : "4.8 sec",
    range: electric ? "320 mi" : hybrid ? "48 mi electric" : "—",
    seating: category === "SUV" ? "5–7 seats" : "2–4 seats",
    bodyStyle: category === "SUV" ? "Sport utility" : category === "Supercar" ? "Mid-engine coupe" : category === "Grand Tourer" ? "Grand touring coupe" : "Performance sedan",
    highlights: electric ? ["Instant electric torque", "Advanced driver assistance", "Quiet long-distance cabin"] : ["Hand-finished materials", "Driver-focused dynamics", "Signature powertrain character"],
    verdict: category === "SUV" ? "The compelling choice for going further without leaving luxury behind." : "A distinctive expression of performance, design, and everyday emotion.",
    gallerySearch: car[11] || `${brand} ${model}`,
    galleryIncludes: car[12] || model,
    galleryExclude: car[13] || "",
  };
};

const defaultData = {
  cars: cars.map((car, index) => ({ ...detailsFor(car), id: index + 1 })),
  favorites: [],
};
let store = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8")) : defaultData;
if (!store.cars?.length) store = defaultData;
const save = () => fs.writeFileSync(dataPath, JSON.stringify(store, null, 2));
const existingIds = new Set(store.cars.map((car) => car.id));
const newCars = defaultData.cars.filter((car) => !existingIds.has(car.id));
if (newCars.length) {
  const nextId = Math.max(...store.cars.map((car) => car.id), 0);
  newCars.forEach((car, index) => store.cars.push({ ...car, id: nextId + index + 1 }));
  save();
}
store.cars = store.cars.map((car) => ({
  ...car,
  acceleration: car.acceleration || (car.horsepower > 700 ? "2.8 sec" : car.horsepower > 500 ? "3.5 sec" : "4.8 sec"),
  range: car.range || (car.fuel === "Electric" ? "320 mi" : car.fuel === "Hybrid" ? "48 mi electric" : "—"),
  seating: car.seating || (car.category === "SUV" ? "5–7 seats" : "2–4 seats"),
  bodyStyle: car.bodyStyle || (car.category === "SUV" ? "Sport utility" : "Performance sedan"),
  highlights: car.highlights || ["Hand-finished materials", "Driver-focused dynamics", "Signature powertrain character"],
  verdict: car.verdict || "A distinctive expression of performance, design, and everyday emotion.",
  gallerySearch: car.gallerySearch || (car.brand === "Range Rover" && car.model === "Sport Autobiography" ? "Land Rover Range Rover Sport Autobiography" : car.brand === "Maserati" && car.model === "GranTurismo Folgore" ? "Maserati GranTurismo Folgore" : `${car.brand} ${car.model}`),
  galleryIncludes: car.galleryIncludes || (car.brand === "Range Rover" && car.model === "Sport Autobiography" ? "Autobiography" : car.brand === "Maserati" && car.model === "GranTurismo Folgore" ? "Folgore" : car.model),
  galleryExclude: car.galleryExclude || (car.brand === "Aston Martin" && car.model === "DB12" ? "Volante" : ""),
}));
if (!fs.existsSync(dataPath)) save();
const galleryCache = new Map();

async function getGallery(car) {
  if (galleryCache.has(car.id)) return galleryCache.get(car.id);
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: car.gallerySearch || `${car.brand} ${car.model}`,
    gsrnamespace: "6",
    gsrlimit: "7",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1400",
    format: "json",
    origin: "*",
  });
  try {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
    if (!response.ok) throw new Error(`Wikimedia returned ${response.status}`);
    const payload = await response.json();
    const images = Object.values(payload.query?.pages || {})
      .filter((page) => page.title.toLowerCase().includes(car.galleryIncludes.toLowerCase()))
      .filter((page) => !car.galleryExclude || !page.title.toLowerCase().includes(car.galleryExclude.toLowerCase()))
      .map((page) => page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url)
      .filter(Boolean)
      .slice(0, 7);
    const gallery = [...new Set([...images, car.image])].slice(0, 7);
    while (gallery.length < 5) gallery.push(car.image);
    galleryCache.set(car.id, gallery);
    return gallery;
  } catch (error) {
    console.error(`Unable to load gallery for ${car.brand} ${car.model}:`, error.message);
    return Array.from({ length: 5 }, () => car.image);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/cars", async (req, res) => {
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
  const enriched = await Promise.all(rows.map(async (car) => {
    const gallery = await getGallery(car);
    return { ...car, image: gallery[0], favorite: favoriteIds.has(car.id) };
  }));
  res.json(enriched);
});

app.get("/api/cars/:id", (req, res) => {
  const car = store.cars.find((item) => item.id === Number(req.params.id));
  if (!car) return res.status(404).json({ error: "Vehicle not found" });
  res.json({ ...car, favorite: store.favorites.includes(car.id) });
});

app.get("/api/cars/:id/gallery", async (req, res) => {
  const car = store.cars.find((item) => item.id === Number(req.params.id));
  if (!car) return res.status(404).json({ error: "Vehicle not found" });
  res.json({ carId: car.id, images: await getGallery(car) });
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
