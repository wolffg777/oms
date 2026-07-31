import "../css/AdjHist.css"
import { useAdjs } from "../hooks/useAdjs"; 
import Adj from "../components/Adj"

function AdjHist() {

  const { data: adjs, isLoading, error } = useAdjs(); 
  
  if (isLoading) return <div>Loading Adjs...</div>;
  if (error) return <div>Failed to load Adjs.</div>;

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
        {adjs.map((adj) => (
          <Adj adj={adj} key={adj.id} />
        ))}
      </div>
    </div>
  );
}

export default AdjHist;