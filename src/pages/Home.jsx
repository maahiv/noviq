import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories } from '../api/seed';

export default function Home({ products }) {
  const deal = products.filter(p=>p.badge==='DEAL' || p.badge==='BEST VALUE').slice(0,4);
  const trend = products.filter(p=>p.badge==='TRENDING' || p.badge==='BESTSELLER' || p.badge==='HOT').slice(0,4);
  return <main>
    <section className="hero section-shell">
      <div className="hero-copy"><p className="eyebrow">TECH, TUNED FOR YOU</p><h1>Upgrade your everyday.<br/><span>Electrify your life.</span></h1><p className="hero-sub">Headphones, wearables, power, gaming and more — curated tech without the clutter.</p><div className="hero-actions"><Link to="/products" className="primary-btn">Shop electronics ↗</Link><a href="#categories" className="secondary-btn">Explore categories</a></div><div className="hero-mini"><span>✓ Genuine products</span><span>✓ COD available</span><span>✓ Easy order tracking</span></div></div>
      <div className="hero-art"><div className="orb orb-a"></div><div className="orb orb-b"></div><div className="hero-device"><div className="device-ring">⚡</div><div><span>ElectroWave</span><strong>New drop</strong></div></div><div className="float-card float-card-top"><small>Today's pick</small><b>PulsePods Air Pro</b><strong>₹2,499</strong></div><div className="float-card float-card-bottom"><span>4.8 ★</span><small>1,200+ tech lovers</small></div></div>
    </section>

    <section id="categories" className="section-shell section-block"><div className="section-head"><div><p className="eyebrow">BROWSE YOUR WAY</p><h2>Shop by category</h2></div><Link to="/products" className="text-link">View all →</Link></div><div className="category-grid">{categories.map(c=><Link key={c.id} to={`/products?category=${c.id}`} className={`category-tile cat-${c.id}`}><span>{c.emoji}</span><b>{c.name}</b><small>Explore →</small></Link>)}</div></section>

    <section id="deals" className="section-shell section-block band"><div className="section-head"><div><p className="eyebrow">LIMITED-TIME PICKS</p><h2>Deals worth plugging in for</h2></div><Link to="/products" className="text-link">See all →</Link></div><div className="products-grid">{deal.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>

    <section className="section-shell section-block"><div className="feature-strip"><div><p className="eyebrow">THE ELECTROWAVE PROMISE</p><h2>Good tech. Less guesswork.</h2><p>Discover products by category, compare specs quickly and keep every order in one clean dashboard.</p></div><div className="feature-stats"><div><b>48h</b><span>dispatch window</span></div><div><b>COD</b><span>at checkout</span></div><div><b>1 tap</b><span>repeat cart</span></div></div></div></section>

    <section className="section-shell section-block"><div className="section-head"><div><p className="eyebrow">COMMUNITY FAVOURITES</p><h2>What people are adding</h2></div></div><div className="products-grid">{trend.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </main>
}
