import "../css/SkuDetails.css";
import SkuDetailsEvent from "./SkuDetailsEvent";

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value ?? "-"}</span>
    </div>
  );
}

function SkuHistory({ events }) {

  return (

    <div className="history-card">

      <h3>Inventory History</h3>

      {!events || events.length === 0 ? (

        <div className="empty-history">
          No inventory history.
        </div>

      ) : (

        events.map(event => (
          <SkuDetailsEvent
            key={event.id}
            event={event}
          />
        ))

      )}

    </div>

  );

}

function SkuDetails({ sku, onClose }) {
  return (
    <div className="sku-detail-panel">

      <div className="sku-detail-card">

      <div className="sku-detail-header">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{sku.name}</h2>
      </div>

      <div className="inventory-card">

        <div className="inventory-label">
          Current Inventory
        </div>

        <div className="inventory-number">
          {sku.quantity}
        </div>

      </div>

      <div className="sku-info-card">

        <h3>Product Details</h3>

        <DetailRow label="Piece" value={sku.piece} />
        <DetailRow label="Size" value={sku.size} />
        <DetailRow label="Color" value={sku.color} />

      </div>

      <SkuHistory events={sku.events} />

    </div>
    </div>
    
  );
}

export default SkuDetails;