import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { add } = useCart();

  const price = Number(product?.price ?? 0);
  const oldPrice = Number(product?.oldPrice ?? price);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img
          src={product?.image || ''}
          alt={product?.name || 'Product'}
          loading="lazy"
        />

        <span className="badge">
          {product?.badge || 'NEW'}
        </span>
      </Link>

      <div className="product-info">
        <div className="muted small">
          {product?.brand || 'Noviq'} · {product?.category || 'Electronics'}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-name"
        >
          {product?.name || 'Unnamed Product'}
        </Link>

        <div className="rating">
          ★ {Number(product?.rating ?? 0).toFixed(1)}
          <span> ({Number(product?.reviews ?? 0)})</span>
        </div>

        <div className="product-bottom">
          <div>
            <strong>
              ₹{price.toLocaleString('en-IN')}
            </strong>

            {oldPrice > price && (
              <del>
                ₹{oldPrice.toLocaleString('en-IN')}
              </del>
            )}
          </div>

          <button
            className="add-btn"
            onClick={() =>
              add({
                ...product,
                price,
                oldPrice
              })
            }
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}