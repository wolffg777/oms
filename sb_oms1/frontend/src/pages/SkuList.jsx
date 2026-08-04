import "../css/SkuList.css";
import { useSkus } from "../hooks/useSkus";
import { useGetAllInvSkus } from "../hooks/useSkuEvents";
import Sku from "../components/Sku";
import SkuDetails from "../components/SkuDetails";
import { useState } from "react";
import SkuCreate from "../components/SkuCreate";

function SkuList() {

  const [panel, setPanel] = useState({
      type: null,
      sku: null,
  });

  const splitView = panel.type !== null;

  const { data: allInv, isLoadingInv, errorInv } = useGetAllInvSkus();

  if (isLoadingInv) return <div>Loading Inv...</div>;
  if (errorInv) return <div>Failed to load Inv.</div>;

  const { data: skus, isLoading, error } = useSkus();

  if (isLoading) return <div>Loading SKUs...</div>;
  if (error) return <div>Failed to load SKUs.</div>;

  if(!allInv) return <div>Loading Inv...</div>;

  let skuQuants = []; 

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
      <div className="sku-toolbar">
        <button
            className="create-sku-btn"
            onClick={() =>
                setPanel({
                    type: "create",
                    sku: null,
                })
            }
        >
            + Create SKU
        </button>
      </div>
      <div className="sku-table">
        <div className="sku-header">
          <div>SKU</div>
          <div>Quantity</div>
        </div>
        {skuQuants.map((sku) => (
          <Sku key={sku.id} sku={sku} onSelect={(sku) =>
              setPanel({
                type: "detail",
                sku,
              })
              }
            />
        ))}
      </div>
    </div>
    {panel.type === "detail" && (
      <SkuDetails
          sku={panel.sku}
          onClose={() =>
              setPanel({
                  type: null,
                  sku: null,
              })
          }
      />
    )}

    {panel.type === "create" && (
      <SkuCreate
          onClose={() =>
              setPanel({
                  type: null,
                  sku: null,
              })
          }
      />
    )}
    </div>
  );
  }

export default SkuList;
