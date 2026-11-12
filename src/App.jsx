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
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            Manajemen Produk
          </h1>
          <p
            style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "13px" }}
          >
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
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
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "280px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <span style={{ color: "#64748b", fontSize: "13px" }}>
          {filteredProducts.length} produk
        </span>
      </div>

      {/* Grid Produk */}
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
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                ID: {product.id}
              </span>
              <h3
                style={{
                  margin: "6px 0 4px 0",
                  color: "#1e293b",
                  fontSize: "16px",
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: "15px",
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
                  padding: "6px",
                  backgroundColor: "white",
                  border: "1px solid #93c5fd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#2563eb",
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
                  padding: "6px",
                  backgroundColor: "white",
                  border: "1px solid #fca5a5",
                  borderRadius: "4px",
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

      <div style={{ color: "#64748b", fontSize: "13px", marginTop: "16px" }}>
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
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              width: "380px",
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
                    marginBottom: "4px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#0f172a",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Tambah Produk
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    margin: "0 0 16px 0",
                  }}
                >
                  Masukkan informasi produk baru.
                </p>

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "4px",
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
                    padding: "8px",
                    margin: "0 0 12px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                  required
                />

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "4px",
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
                    padding: "8px",
                    margin: "0 0 4px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                  required
                />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    margin: "0 0 20px 0",
                  }}
                >
                  Harga harus lebih dari 0.
                </p>

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
                      padding: "6px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                      fontSize: "13px",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    Simpan Produk
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
                    marginBottom: "4px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#0f172a",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Edit Produk
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    margin: "0 0 4px 0",
                  }}
                >
                  Perbarui informasi produk yang dipilih.
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    margin: "0 0 16px 0",
                  }}
                >
                  ID: {selectedProduct.id}
                </p>

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "4px",
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
                    padding: "8px",
                    margin: "0 0 12px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                  required
                />

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "4px",
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
                    padding: "8px",
                    margin: "0 0 4px 0",
                    border: "1px solid #cbd5e1",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                  }}
                  required
                />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    margin: "0 0 20px 0",
                  }}
                >
                  Harga harus lebih dari 0.
                </p>

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
                      padding: "6px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                      fontSize: "13px",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px",
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
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fee2e2",
                        padding: "6px",
                        borderRadius: "6px",
                        color: "#dc2626",
                        display: "flex",
                      }}
                    >
                      🗑️
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#0f172a",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Hapus Produk?
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    margin: "0 0 16px 0",
                  }}
                >
                  Produk yang dihapus tidak dapat dikembalikan.
                </p>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    ID: {selectedProduct.id}
                  </span>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#1e293b",
                      fontSize: "14px",
                      margin: "2px 0",
                    }}
                  >
                    {selectedProduct.name}
                  </div>
                  <div
                    style={{
                      color: "#2563eb",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
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
                      padding: "6px 14px",
                      backgroundColor: "white",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "#334155",
                      fontSize: "13px",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px",
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
