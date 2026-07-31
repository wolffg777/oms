import "../css/Sku.css";

function Sku({ sku }) {
  return (
    <button
      className="sku-row"
      onClick={() => alert(`Clicked ${sku.name}`)}
    >
      <div className="sku-name">{sku.name}</div>
      <div className="sku-quantity">{sku.quantity}</div>
    </button>
  );
}

export default Sku;