import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
export default function ProductDetails({ products }) {
  const { id } = useParams(); const navigate = useNavigate(); const { add } = useCart(); const [qty,setQty]=useState(1);
  const product=products.find(p=>p.id===id); if(!product) return <main className="section-shell empty-state"><h2>Product not found</h2><Link to="/products" className="primary-btn">Back to shop</Link></main>;
  const related=products.filter(p=>p.categoryId===product.categoryId && p.id!==product.id).slice(0,4);
  const addMany=()=>{for(let i=0;i<qty;i++) add(product); navigate('/cart')};
  return <main className="section-shell detail-page"><Link to="/products" className="back-link">← Back to shop</Link><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/><span>{product.badge}</span></div><div className="detail-copy"><div className="muted">{product.brand} · {product.category}</div><h1>{product.name}</h1><div className="rating big">★ {product.rating} <span>({product.reviews} reviews)</span></div><p className="detail-description">{product.description}</p><div className="price-row"><strong>₹{product.price.toLocaleString('en-IN')}</strong><del>₹{product.oldPrice.toLocaleString('en-IN')}</del><span className="save-pill">Save ₹{(product.oldPrice-product.price).toLocaleString('en-IN')}</span></div><div className="spec-box"><h3>Highlights</h3><ul>{product.specs.map(s=><li key={s}>✓ {s}</li>)}</ul></div><div className="purchase-row"><div className="stepper"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(qty+1)}>+</button></div><button className="primary-btn grow" onClick={addMany}>Add {qty} to cart</button></div></div></div>{related.length>0&&<section className="section-block"><div className="section-head"><h2>More from {product.category}</h2></div><div className="products-grid">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}</main>
}
