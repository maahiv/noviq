import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
export default function Products({ products, categories }) {
  const [params, setParams] = useSearchParams(); const [sort, setSort] = useState('featured');
  const q = params.get('q') || ''; const category = params.get('category') || 'all';
  const filtered = useMemo(()=>{
    let list=products.filter(p=>category==='all'||p.categoryId===category).filter(p=>!q||`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase()));
    if(sort==='price-low') list=[...list].sort((a,b)=>a.price-b.price);
    if(sort==='price-high') list=[...list].sort((a,b)=>b.price-a.price);
    if(sort==='rating') list=[...list].sort((a,b)=>b.rating-a.rating);
    return list;
  },[products,category,q,sort]);
  const selectedName=category==='all'?'Shop all electronics':categories.find(c=>c.id===category)?.name || 'Shop all electronics';
  return <main className="section-shell listing-page"><div className="listing-hero"><div><p className="eyebrow">THE NOVIQ EDIT</p><h1>{q ? `Search results for “${q}”` : selectedName}</h1><p className="muted">{filtered.length} products available right now</p></div><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Sort: Featured</option><option value="rating">Top rated</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option></select></div><div className="filter-chips"><button className={category==='all'?'active':''} onClick={()=>setParams(q?{q}:{})}>All</button>{categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setParams({...Object.fromEntries(params),category:c.id})}>{c.emoji} {c.name}</button>)}</div>{filtered.length ? <div className="products-grid large">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><div>⌕</div><h2>No products found</h2><p>Try another search or category.</p><Link to="/products" className="primary-btn">Clear filters</Link></div>}</main>
}
