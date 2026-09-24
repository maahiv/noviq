export default function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div><div className="brand footer-brand"><span className="brand-mark">⚡</span><span>Electro<span>Wave</span></span></div><p>Everyday tech, picked for the way you live.</p></div>
      <div><h4>Shop</h4><a href="/products">All Products</a><a href="/products?category=audio">Audio</a><a href="/products?category=computing">Computing</a></div>
      <div><h4>Help</h4><a href="/orders">Orders</a><a href="/profile">Profile</a><a href="/cart">Cart</a></div>
      <div><h4>Promise</h4><p>Secure checkout</p><p>COD available</p><p>Fast support</p></div>
    </div>
    <div className="footer-bottom">© 2026 ElectroWave · Demo project for React + Firebase REST assignment.</div>
  </footer>
}
