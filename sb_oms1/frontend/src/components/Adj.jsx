import "../css/Adj.css"

function Adj({ adj }) {
  return (
    <button
      className="adj-row"
      onClick={() => alert(`Clicked ${adj.name}`)}
    >
      <div className="adj-date">{Date(adj.createdAt)}</div>
      <div className="adj-name">{adj.name}</div>
      <div className="adj-type">{adj.type}</div>
      <div className="adj-pieces">--</div>
      <div className="adj-skus">--</div>
    </button>
  );
}
 
export default Adj;