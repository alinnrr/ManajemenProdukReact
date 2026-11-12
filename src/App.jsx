import React, { useState } from "react";

export default function App() {
  const [products] = useState([
    { id: 1, name: "Pulpen", price: 5000 },
    { id: 2, name: "Buku Tulis", price: 12000 },
    { id: 3, name: "Spidol", price: 8000 },
    { id: 4, name: "Penggaris", price: 6000 },
    { id: 5, name: "Penghapus", price: 3000 },
  ]);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#0f172a" }}>Manajemen Produk</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>
              ID: {product.id}
            </span>
            <h3 style={{ margin: "8px 0 4px 0", color: "#1e293b" }}>
              {product.name}
            </h3>
            <p
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                fontSize: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Rp{product.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
