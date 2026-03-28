import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Topbar({ title }) {
  const { cart } = useCart();
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="flex items-center gap-3">
        {itemCount > 0 && (
          <span
            style={{
              fontSize: ".82rem",
              background: "var(--primary)",
              color: "#fff",
              padding: "3px 10px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ShoppingCart size={13} /> {itemCount} item
            {itemCount > 1 ? "s" : ""} in cart
          </span>
        )}
        <span style={{ fontSize: ".82rem", color: "var(--text-muted)" }}>
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </header>
  );
}
