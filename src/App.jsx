import React, { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Pulpen", price: 5000 },
    { id: 2, name: "Buku Tulis", price: 12000 },
    { id: 3, name: "Spidol", price: 8000 },
    { id: 4, name: "Penggaris", price: 6000 },
    { id: 5, name: "Penghapus", price: 3000 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenAdd = () => {
    setInputName("");
    setInputPrice("");
    setActiveModal("add");
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setInputName(product.name);
    setInputPrice(product.price);
    setActiveModal("edit");
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setActiveModal("delete");
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!inputName || inputPrice <= 0) return;
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([
      ...products,
      { id: newId, name: inputName, price: Number(inputPrice) },
    ]);
    setActiveModal(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!inputName || inputPrice <= 0) return;
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, name: inputName, price: Number(inputPrice) }
          : p,
      ),
    );
    setActiveModal(null);
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setActiveModal(null);
  };

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
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Tambah Produk
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
        <span style={{ color: "#64748b", fontSize: "14px" }}>
          {filteredProducts.length} produk
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {filteredProducts.map((product) => (
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
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleOpenEdit(product)}
                style={{
                  flex: 1,
                  padding: "6px",
                  backgroundColor: "white",
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenDelete(product)}
                style={{
                  flex: 1,
                  padding: "6px",
                  backgroundColor: "white",
                  border: "1px solid #ef4444",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#ef4444",
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: "#64748b", fontSize: "14px" }}>
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {activeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              width: "380px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeModal === "add" && (
              <form onSubmit={handleSaveAdd}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Tambah Produk</h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "16px",
                  }}
                >
                  Masukkan informasi produk baru.
                </p>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pulpen"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "4px 0 12px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                  }}
                  required
                />
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 5000"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "4px 0 16px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                  }}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Simpan Produk
                  </button>
                </div>
              </form>
            )}

            {activeModal === "edit" && (
              <form onSubmit={handleSaveEdit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Edit Produk</h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Perbarui informasi produk yang dipilih.
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginBottom: "16px",
                  }}
                >
                  ID: {selectedProduct.id}
                </p>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "4px 0 12px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                  }}
                  required
                />
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "4px 0 16px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                  }}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}

            {activeModal === "delete" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#ef4444" }}>Hapus Produk?</h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "16px",
                  }}
                >
                  Produk yang dihapus tidak dapat dikembalikan.
                </p>
                <div
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    ID: {selectedProduct.id}
                  </span>
                  <div style={{ fontWeight: "bold", color: "#1e293b" }}>
                    {selectedProduct.name}
                  </div>
                  <div style={{ color: "#2563eb" }}>
                    Rp{selectedProduct.price.toLocaleString("id-ID")}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Hapus Produk
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
