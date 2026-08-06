import "../css/AdjHist.css"
import { useAdjs } from "../hooks/useAdjs"; 
import { useGetAllInvAdjs } from "../hooks/useSkuEvents";
import Adj from "../components/Adj"
import { Link } from "react-router-dom";


function AdjHist() {

  const { 
    data: adjInv, 
    isPending: isInvPending, 
    isError: isInvError,
    error: invError 
  } = useGetAllInvAdjs(); 

  const { 
    data: adjs, 
    isPending: isAdjPending, 
    isError: isAdjError, 
    error: adjError
  } = useAdjs(); 

  if (isInvPending || isAdjPending) {
    return <div style={{ marginLeft: "260px" }}>Loading...</div>;
  }

  if (isInvError || isAdjError) {
    return <div style={{ marginLeft: "260px" }}>Error: {invError?.message || adjError?.message}</div>;
  }

  let adjRet = []; 

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
        <div className="adj-toolbar">
          <Link to="/adjcreate" className="create-adj-btn">+ Create Adjustment</Link>
      </div>
      <div className="adj-table">
        <div className="adj-header">
          <div>Date</div>
          <div>Name</div> 
          <div>Type</div>
          <div>Skus Moved</div>
          <div>Pieces Moved</div>
        </div>
        {adjRet.map((adj) => (
          <Adj adj={adj} key={adj.adjId} />
        ))}
      </div>
    </div>
  );
}

export default AdjHist;