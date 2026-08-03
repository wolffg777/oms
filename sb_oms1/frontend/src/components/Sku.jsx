import "../css/Sku.css";
import SkuDetails from "./SkuDetails";

function Sku({ sku, onSelect }) {
    return (
        <button
            className="sku-row"
            onClick={() => onSelect(sku)}
        >
            <div className="sku-name">{sku.name}</div>
            <div className="sku-quantity">{sku.quantity}</div>
        </button>
    );
}

export default Sku;