import { useState } from "react";
import { useCreateSku } from "../hooks/useSkus";
import "../css/SkuCreate.css";

function SkuCreate({ onClose }) {
  const [piece, setPiece] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");

  const createSku = useCreateSku();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = {
      piece,
      size,
      color,
      brand,
    };

    try {
      await createSku.mutateAsync(formData);

      // Clear the form after success
      setPiece("");
      setSize("");
      setColor("");
      setBrand("");

      alert("SKU created!");
    } catch (err) {
      console.error(err);
      alert("Failed to create SKU.");
    }
  }

  return (
    <div className="sku-create-panel">

      <div className="sku-create-card">

        <div className="sku-create-header">

            <button
                className="close-btn"
                onClick={onClose}
            >
                ✕
            </button>

            <h2>Create SKU</h2>

        </div>
    <div className="form-main">
      <form onSubmit={onSubmit}>

        <label>
          Piece:
          <input
            type="text"
            value={piece}
            onChange={(e) => setPiece(e.target.value)}
          />
        </label>

        <label>
          Size:
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        <button
          className="make-sku"
          type="submit"
          disabled={createSku.isPending}
        >
          {createSku.isPending ? "Creating..." : "Create SKU"}
        </button>

      </form>
    </div>
    </div>
    </div>
  );
}

export default SkuCreate;