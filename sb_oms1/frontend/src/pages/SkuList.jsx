import "../css/SkuList.css";
import { useSkus } from "../hooks/useSkus";
import { useGetAllInv } from "../hooks/useSkuEvents";
import Sku from "../components/Sku";

function SkuList() {
  const { data: allInv, isLoadingInv, errorInv } = useGetAllInv();

  if (isLoadingInv) return <div>Loading Inv...</div>;
  if (errorInv) return <div>Failed to load Inv.</div>;

  const { data: skus, isLoading, error } = useSkus();

  if (isLoading) return <div>Loading SKUs...</div>;
  if (error) return <div>Failed to load SKUs.</div>;

  if(!allInv) return <div>Loading Inv...</div>;

  var skuQuants = []; 

  const allInvMap = new Map(allInv.map(item => [item.skuId, item]));

  skus.forEach(sku => {
    const match = allInvMap.get(sku.id);
    if (match) {
      skuQuants.push({ skuId: sku.id, name: sku.name, quantity: match.quantity });
    }
  });

  return (
    <div className="skuList-main" style={{ marginLeft: '220px' }}>
      <h1>SKU Inventory</h1>
      <div className="sku-table">
        <div className="sku-header">
          <div>SKU</div>
          <div>Quantity</div>
        </div>
        {skuQuants.map((sku) => (
          <Sku sku={sku} key={sku.skuId} />
        ))}
      </div>
    </div>
  );
}

export default SkuList;
