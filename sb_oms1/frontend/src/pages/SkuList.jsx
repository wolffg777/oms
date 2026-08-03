import "../css/SkuList.css";
import { useSkus } from "../hooks/useSkus";
import { useGetAllInvSkus } from "../hooks/useSkuEvents";
import Sku from "../components/Sku";
import SkuDetails from "../components/SkuDetails";
import { useState } from "react";

function SkuList() {
  const [selectedSku, setSelectedSku] = useState(null);
  
  const splitView = selectedSku !== null;

  const { data: allInv, isLoadingInv, errorInv } = useGetAllInvSkus();

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
      skuQuants.push({ ...sku, quantity: match.quantity });
    }
  });

  return (
    <div className={`sku-page ${splitView ? "split" : ""}`} style={{ marginLeft: "260px" }}>
    <div className="sku-list">
      <h1>SKU Inventory</h1>
      <div className="sku-table">
        <div className="sku-header">
          <div>SKU</div>
          <div>Quantity</div>
        </div>
        {skuQuants.map((sku) => (
          <Sku sku={sku} key={sku.skuId} onSelect={setSelectedSku} />
        ))}
      </div>
    </div>
    {splitView && (
            <SkuDetails
                sku={selectedSku}
                onClose={() => setSelectedSku(null)}
            />
        )}
    </div>
  );
  }

export default SkuList;
