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
        padding: "40px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "16px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            Manajemen Produk
          </h1>
          <p
            style={{ color: "#64748b", margin: "6px 0 0 0", fontSize: "14px" }}
          >
            Kelola daftar produk dan harga dalam satu tempat dengan mudah.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
            boxShadow: "0 2px 4px rgba(37,99,235,0.2)",
          }}
        >
          + Tambah Produk
        </button>
      </div>

      {/* Search & Counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            width: "320px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "500" }}>
          Total: {filteredProducts.length} produk
        </span>
      </div>

      {/* Grid Produk */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                ID: {product.id}
              </span>
              <h3
                style={{
                  margin: "8px 0 6px 0",
                  color: "#1e293b",
                  fontSize: "18px",
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "700",
                  fontSize: "16px",
                  margin: "0 0 16px 0",
                }}
              >
                Rp{product.price.toLocaleString("id-ID")}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleOpenEdit(product)}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "#334155",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenDelete(product)}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "#dc2626",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
          marginTop: "20px",
        }}
      >
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </div>

      {/* Modal / Pop-up */}
      {activeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "28px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            {/* Modal Tambah */}
            {activeModal === "add" && (
              <form onSubmit={handleSaveAdd}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "18px" }}>
                    Tambah Produk Baru
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pulpen"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "0 0 16px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 5000"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "0 0 20px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            )}

            {/* Modal Edit */}
            {activeModal === "edit" && (
              <form onSubmit={handleSaveEdit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "18px" }}>
                    Edit Produk
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    margin: "0 0 16px 0",
                  }}
                >
                  ID Produk: {selectedProduct.id}
                </p>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "0 0 16px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "0 0 20px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}

            {/* Modal Hapus */}
            {activeModal === "delete" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#dc2626", fontSize: "18px" }}>
                    Hapus Produk
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    marginBottom: "16px",
                  }}
                >
                  Apakah kamu yakin ingin menghapus produk ini?
                </p>
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "14px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1e293b",
                      fontSize: "16px",
                    }}
                  >
                    {selectedProduct.name}
                  </div>
                  <div
                    style={{
                      color: "#2563eb",
                      fontWeight: "500",
                      marginTop: "4px",
                    }}
                  >
                    Rp{selectedProduct.price.toLocaleString("id-ID")}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    style={{
                      padding: "9px 16px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Ya, Hapus
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
