import "../css/AdjHist.css"
import { useAdjs } from "../hooks/useAdjs"; 
import { useGetAllInvAdjs } from "../hooks/useSkuEvents";
import Adj from "../components/Adj"

function AdjHist() {

  const { data: adjInv, isLoading1, error1 } = useGetAllInvAdjs(); 

  if (isLoading1) return <div>Loading Inv...</div>;
  if (error1) return <div>Failed to load Inv.</div>;

  const { data: adjs, isLoading, error } = useAdjs(); 
  
  if (isLoading) return <div>Loading Adjs...</div>;
  if (error) return <div>Failed to load Adjs.</div>;

  if(!adjInv) return <div>Loading Inv...</div>;

  var adjRet = []; 

  const adjInvMap = new Map(adjInv.map(item => [item.adjId, item]));

  adjs.forEach(adj => {
    const match = adjInvMap.get(adj.id);
    if (match) {
      adjRet.push({ adjId: adj.id, createdAt: adj.createdAt, name: adj.name, type: adj.type, quantity: match.quantity, pieces: match.skuNames});
    }
  });

  return (
    <div className="adjhist-main" style={{ marginLeft: '220px' }}>
      <h1>Adj Hist</h1>
      <div className="adj-table">
        <div className="adj-header">
          <div>Date</div>
          <div>Name</div> 
          <div>Type</div>
          <div>Pieces Moved</div>
          <div>Skus Moved</div>
        </div>
        {adjRet.map((adj) => (
          <Adj adj={adj} key={adj.adjId} />
        ))}
      </div>
    </div>
  );
}

export default AdjHist;