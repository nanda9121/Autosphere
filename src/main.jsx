import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, ChevronDown, Heart, Menu, Search, SlidersHorizontal, Sparkles, X, Zap } from "lucide-react";
import "./styles.css";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function App() {
  const [cars, setCars] = useState([]);
  const [meta, setMeta] = useState({ categories: [], total: 0 });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [compare, setCompare] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadCars = async () => {
    const params = new URLSearchParams({ q: query, category, sort });
    const response = await fetch(`/api/cars?${params}`);
    setCars(await response.json());
  };

  useEffect(() => { fetch("/api/meta").then((response) => response.json()).then(setMeta); }, []);
  useEffect(() => { loadCars(); }, [query, category, sort]);

  const featured = useMemo(() => cars.slice(0, 3), [cars]);
  const toggleFavorite = async (id) => {
    const response = await fetch(`/api/favorites/${id}`, { method: "POST" });
    const { favorite } = await response.json();
    setCars((current) => current.map((car) => car.id === id ? { ...car, favorite } : car));
    if (selected?.id === id) setSelected({ ...selected, favorite });
  };
  const toggleCompare = (car) => setCompare((current) => current.some((item) => item.id === car.id) ? current.filter((item) => item.id !== car.id) : current.length < 3 ? [...current, car] : current);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">A</span><span>Auto<span>Sphere</span></span></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#collection">Collection</a><a href="#experience">Experience</a><a href="#about">About</a>
        </nav>
        <div className="top-actions"><button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={20} /></button><button className="saved-link" onClick={() => setCategory("All")}><Heart size={17} /> Saved <span>{cars.filter((car) => car.favorite).length}</span></button><button className="avatar">NK</button></div>
      </header>

      <main>
        <section className="hero" id="experience">
          <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> THE ART OF THE DRIVE</p><h1>Find the car<br /><em>that moves you.</em></h1><p className="hero-text">A considered collection of the world's most exceptional vehicles. Explore by feeling, performance, and purpose.</p><a className="primary-btn" href="#collection">Explore collection <ArrowUpRight size={17} /></a></div>
          <div className="hero-visual"><div className="hero-glow" /><img src={featured[0]?.image} alt={featured[0]?.model || "Luxury car"} /><div className="hero-caption"><span>01 / FEATURED</span><strong>{featured[0]?.brand} {featured[0]?.model}</strong><small>{featured[0]?.category} · {featured[0] ? money.format(featured[0].price) : ""}</small></div></div>
        </section>

        <section className="stats-strip"><div><strong>{meta.total || 12}</strong><span>Curated vehicles</span></div><div><strong>09</strong><span>Iconic marques</span></div><div><strong>01</strong><span>Point of view</span></div><div className="quote">“The right car changes how you see the road.”</div></section>

        <section className="collection-section" id="collection">
          <div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Choose your <em>feeling.</em></h2></div><p>From electric silence to a V8 soundtrack,<br />discover what speaks to you.</p></div>
          <div className="toolbar"><div className="category-tabs"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All vehicles</button>{meta.categories.map(({ category: name, count }) => <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name} <sup>{count}</sup></button>)}</div><div className="sort-control"><SlidersHorizontal size={16} /><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="power">Most powerful</option></select><ChevronDown size={15} /></div></div>
          <div className="search-row"><div className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a marque, model, or feeling..." /><kbd>⌘ K</kbd></div><span className="result-count">{cars.length} vehicles</span></div>
          <div className="car-grid">{cars.map((car, index) => <CarCard key={car.id} car={car} index={index} onSelect={setSelected} onFavorite={toggleFavorite} onCompare={toggleCompare} compare={compare.some((item) => item.id === car.id)} />)}</div>
          {!cars.length && <div className="empty"><Search size={28} /><h3>No vehicles found</h3><p>Try a different search or browse the full collection.</p><button className="text-btn" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button></div>}
        </section>

        <section className="manifesto" id="about"><div className="manifesto-word">MOVE</div><div><p className="eyebrow">OUR POINT OF VIEW</p><h2>More than a machine.<br /><em>A way of moving through life.</em></h2><p>AutoSphere is a space for people who appreciate the details: the turn of a wheel, the sound of an engine, the calm of a well-designed cabin. We curate the remarkable so you can find your next chapter.</p></div></section>
      </main>

      {compare.length > 0 && <div className="compare-bar"><span><Zap size={17} /> Comparing {compare.length} of 3</span><div>{compare.map((car) => <button key={car.id} onClick={() => toggleCompare(car)}>{car.model} <X size={13} /></button>)}</div><button className="primary-btn compact" onClick={() => setCompare([])}>Clear</button></div>}
      {selected && <DetailModal car={selected} onClose={() => setSelected(null)} onFavorite={toggleFavorite} />}
      <footer id="footer"><div className="brand"><span className="brand-mark">A</span><span>Auto<span>Sphere</span></span></div><p>© 2025 AutoSphere. Drive what moves you.</p><div><a href="#collection">Collection</a><a href="#about">Our story</a></div></footer>
    </div>
  );
}

function CarCard({ car, index, onSelect, onFavorite, onCompare, compare }) {
  return <article className="car-card" style={{ "--delay": `${index * 70}ms` }}><div className="car-image" onClick={() => onSelect(car)}><img src={car.image} alt={`${car.brand} ${car.model}`} loading="lazy" /><div className="card-top"><span className="tag">{car.category}</span><button className={car.favorite ? "heart active" : "heart"} onClick={(event) => { event.stopPropagation(); onFavorite(car.id); }} aria-label="Save vehicle"><Heart size={18} fill={car.favorite ? "currentColor" : "none"} /></button></div><button className="view-btn">View details <ArrowUpRight size={15} /></button></div><div className="car-info"><div><p className="car-brand">{car.brand}</p><h3>{car.model}</h3></div><strong>{money.format(car.price)}</strong></div><div className="car-specs"><span>{car.horsepower} HP</span><span>{car.fuel}</span><span>{car.year}</span><button className={compare ? "compare active" : "compare"} onClick={() => onCompare(car)}>{compare ? "Added" : "+ Compare"}</button></div></article>;
}

function DetailModal({ car, onClose, onFavorite }) {
  return <div className="modal-backdrop" onClick={onClose}><section className="detail-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X /></button><img src={car.image} alt={`${car.brand} ${car.model}`} /><div className="detail-content"><p className="eyebrow">{car.category} · {car.year}</p><h2>{car.brand}<br /><em>{car.model}</em></h2><p>{car.description}</p><div className="detail-grid"><div><span>Power</span><strong>{car.horsepower} HP</strong></div><div><span>Engine</span><strong>{car.engine}</strong></div><div><span>Drivetrain</span><strong>{car.fuel}</strong></div><div><span>Price</span><strong>{money.format(car.price)}</strong></div></div><div className="detail-actions"><button className="primary-btn">Enquire about this car <ArrowUpRight size={17} /></button><button className="secondary-btn" onClick={() => onFavorite(car.id)}><Heart size={17} fill={car.favorite ? "currentColor" : "none"} /> {car.favorite ? "Saved" : "Save vehicle"}</button></div></div></section></div>;
}

createRoot(document.getElementById("root")).render(<App />);
