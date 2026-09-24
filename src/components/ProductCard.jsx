import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { add } = useCart();
  return <article className="product-card">
    <Link to={`/products/${product.id}`} className="product-image-wrap">
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className="badge">{product.badge}</span>
    </Link>
    <div className="product-info">
      <div className="muted small">{product.brand} · {product.category}</div>
      <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
      <div className="rating">★ {product.rating} <span>({product.reviews})</span></div>
      <div className="product-bottom"><div><strong>₹{product.price.toLocaleString('en-IN')}</strong> <del>₹{product.oldPrice.toLocaleString('en-IN')}</del></div><button className="add-btn" onClick={()=>add(product)}>Add</button></div>
    </div>
  </article>
}
