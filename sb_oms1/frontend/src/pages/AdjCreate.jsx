import { useState } from "react";
import { useCreateAdj } from "../hooks/useAdjs";
import { useGetAllInvSkus } from "../hooks/useSkuEvents"; 
import { Link } from "react-router-dom";
import "../css/AdjCreate.css"
import { useNavigate } from "react-router-dom";

function AdjCreate( {onClose} ){

  const navigate = useNavigate();

  const [skuEntries, setSkuEntries] = useState([]);  
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  // const [notes, setNotes] = useState("");

  const createAdj = useCreateAdj();

  console.log(skuEntries);

  const { 
    data: inv, 
    isPending: isInvPending, 
    isError: isInvError, 
    error: invError 
  } = useGetAllInvSkus();

  if (isInvPending) {
    return <div style={{ marginLeft: "260px" }}>Loading...</div>;
  }

  if (isInvError) {
    return <div style={{ marginLeft: "260px" }}>Error: {invError.message}</div>;
  }

  function handleEntryChange(index, field, value) {

    const updated = [...skuEntries];

    updated[index] = {
        ...updated[index],
        [field]: value
    };

    setSkuEntries(updated);
  }

  function handleSkuSelection(index, selectedItem) {

    const updated = [...skuEntries];

    updated[index] = {
        ...updated[index],
        skuId: selectedItem.skuId,
        skuName: selectedItem.name,
        curQuant: selectedItem.quantity
    };

    setSkuEntries(updated);
}

  function removeEntry(index) {
    setSkuEntries(
        skuEntries.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    

    const skuData = skuEntries.map(({ skuId, mod }) => ({ skuId, mod }));
    const formData = {
      name,
      type, 
      // notes,
      items: skuData, 
    };

    // somehow check for empty fields 

    try {
      await createAdj.mutateAsync(formData);

      // Clear the form after success
      setName("");
      setType(""); 
      // setNotes("");
      setSkuEntries([]); 

      alert("Adj created!");
      navigate("/adjhist");
    } catch (err) {
      console.error(err);
      alert("Failed to create Adj.");
    }
  }

  function SkuEntry({ entry, index, onChange, onClick }) {

    return (
      <div className="sku-entry-main"> SkuEntry
      <fieldset>
      <select 
        value={entry.skuId} 
        onChange={(e) => {
        const selectedItem = inv.find(
            item => item.skuId === e.target.value
        );

        if (selectedItem) {
            handleSkuSelection(index, selectedItem);
        }
       }}>
        <option value=""> Select a SKU </option>
        {inv.map((item) => (
          <option key={item.skuId} value={item.skuId}>{item.name}</option>
            ))}
        </select>
        <input
          type="number"
          value={entry.mod}
          onChange={(e) => 
            onChange(index, "mod", Number(e.target.value))
        }
        />
      </fieldset>
      <button
        type="button"
        onClick={() => onClick(index)}> ✕ 
      </button>
      </div>
    )
  }
  
  return (
    <div className="adjcreate-main" style={{ marginLeft: '220px' }}>
      <div className="adjcreate-header">
        <Link to="/adjhist" className="close-btn">
          ✕
        </Link>
        <h2>Create Inventory Adjustment</h2>
      </div>
      <div className="form-fields">
        <form onSubmit={onSubmit}>

        <label>
          Name:
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </label>

        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Shipment">Shipment</option>
            <option value="Recount">Recount</option>
            <option value="Stock Transfer">Stock Transfer</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* <label>
          Notes:
          <input 
            type="text" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />
        </label> */}

        {/* Sku Entries */}
        <div className="skus-header">  
          <button 
          className="make-sku"
          type="button"
          onClick={() => 
            setSkuEntries([...skuEntries,
              {
                skuId: "",
                skuName: "",
                curQuant: "",
                mod: 0
              }
            ])}>
          + </button>
          <div> SKU </div>
          <div> +/- </div>
          <div> CurQuant </div>
          <div> NewQuant </div>
        </div>
        {skuEntries.map((entry, index) => (
          <div> 
            <SkuEntry
              key={index}
              entry={entry}
              index={index}
              onChange={handleEntryChange}
              onClick={removeEntry}
              />
          </div>
            ))}
        <div className="make-adj"> 
          <button
              className="submit-adj"
              type="submit"
              disabled={createAdj.isPending}
            >
              {createAdj.isPending ? "Creating..." : "Create Adj"}
          </button>
          <Link to="/adjhist"></Link>
        </div>

        </form>
      </div>
    </div>
  )
}

export default AdjCreate; 


