import "../css/SkuList.css";
import { useSkus } from "../hooks/useSkus";
import Sku from "../components/Sku";

function SkuList() {
  const { data: skus, isLoading, error } = useSkus();

  if (isLoading) return <div>Loading SKUs...</div>;
  if (error) return <div>Failed to load SKUs.</div>;

  return (
    <div className="skuList-main" style={{ marginLeft: '220px' }}>
      <h1>SKU Inventory</h1>

      <div className="sku-table">
        <div className="sku-header">
          <div>SKU</div>
          <div>Quantity</div>
        </div>

        {skus.map((sku) => (
          <Sku sku={sku} key={sku.id} />
        ))}
      </div>
    </div>
  );
}

export default SkuList;