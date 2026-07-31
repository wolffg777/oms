import "../css/Sku.css";

function Sku({ sku }) {

  return (
    <div className="sku-row">
      <div className="sku-name">{sku.name}</div>
      <div className="sku-quantity">{sku.quantity}</div>
      {/* <div className="sku-quantity">--</div> */}
    </div>
  );
}

export default Sku;