import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home({ products, categories }) {
  const deal = products.filter(p=>['DEAL','BEST VALUE','POPULAR'].includes(p.badge)).slice(0,4);
  const trend = products.filter(p=>['TRENDING','BESTSELLER','HOT','GAMER PICK'].includes(p.badge)).slice(0,4);
  const heroProduct = products.find(p=>p.badge==='BESTSELLER') || products[0];
  return <main>
    <section className="hero section-shell">
      <div className="hero-copy">
        <div className="hero-kicker"><span></span> FUTURE-READY EVERYDAY TECH</div>
        <h1>Make every day<br/><span>sound better.</span></h1>
        <p className="hero-sub">Shop curated electronics — from ANC headphones and earbuds to gaming gear, smart watches, mobiles and laptops.</p>
        <div className="hero-actions"><Link to="/products" className="primary-btn">Shop electronics ↗</Link><a href="#categories" className="secondary-btn">Browse categories</a></div>
        <div className="hero-trust"><span>✓ Fast dispatch</span><span>✓ COD available</span><span>✓ Live order tracking</span></div>
      </div>
      <div className="hero-art">
        {heroProduct&&<>
          <div className="hero-glow"></div>
          <div className="hero-product-card"><img src={heroProduct.image} alt={heroProduct.name}/><div><small>Featured drop</small><b>{heroProduct.name}</b><strong>₹{Number(heroProduct.price).toLocaleString('en-IN')}</strong></div></div>
        </>}
        <div className="hero-chip chip-top">4.8 ★<small>customer rating</small></div>
        <div className="hero-chip chip-bottom"><strong>COD</strong><small>pay when it arrives</small></div>
      </div>
    </section>

    <section id="categories" className="section-shell section-block"><div className="section-head"><div><p className="eyebrow">SHOP THE COLLECTION</p><h2>Pick your next upgrade</h2></div><Link to="/products" className="text-link">View all →</Link></div><div className="category-grid">{categories.map(c=><Link key={c.id} to={`/products?category=${c.id}`} className="category-tile"><span>{c.emoji}</span><b>{c.name}</b><small>Explore →</small></Link>)}</div></section>

    <section id="deals" className="section-shell section-block promo-band"><div className="section-head"><div><p className="eyebrow">SMARTER PRICES</p><h2>Deals worth adding to cart</h2></div><Link to="/products" className="text-link">See all →</Link></div><div className="products-grid">{deal.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>

    <section className="section-shell section-block"><div className="feature-strip"><div><p className="eyebrow">WHY VOLTURA</p><h2>Good gear, without the guesswork.</h2><p>Compare prices, see key specs at a glance and keep every order, address and update in one place.</p><div className="feature-points"><span>01 · Curated categories</span><span>02 · Live stock catalogue</span><span>03 · COD checkout</span></div></div><div className="feature-stats"><div><b>10K+</b><span>products journey-ready</span></div><div><b>COD</b><span>available at checkout</span></div><div><b>24/7</b><span>account access</span></div></div></div></section>

    <section className="section-shell section-block"><div className="section-head"><div><p className="eyebrow">TRENDING NOW</p><h2>What shoppers are loving</h2></div><Link to="/products" className="text-link">Shop all →</Link></div><div className="products-grid">{trend.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </main>
}
