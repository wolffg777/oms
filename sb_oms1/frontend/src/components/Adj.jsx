import "../css/Adj.css"

function Adj({ adj }) {

  const d = new Date(adj.createdAt);
  const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  return (
    <button
      className="adj-row"
      onClick={() => alert(`Clicked ${adj.name}`)}
    >
      <div className="adj-date">{date}</div>
      <div className="adj-name">{adj.name}</div>
      <div className="adj-type">{adj.type}</div>
      <div className="adj-pieces">{adj.pieces.join(", ")}</div>
      <div className="adj-quantity">{adj.quantity}</div>
    </button>
  );
}
 
export default Adj;