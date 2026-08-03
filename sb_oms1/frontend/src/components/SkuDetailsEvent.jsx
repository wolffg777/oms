function SkuDetailsEvent({ event }) {

  const positive = event.mod > 0;

  return (

    <div className="history-event">

      <div
        className={
          positive
            ? "history-mod positive"
            : "history-mod negative"
        }
      >
        {positive ? "+" : ""}
        {event.mod}
      </div>

      <div className="history-details">

        <div className="history-title">
          {event.adj?.type ?? "Inventory Adjustment"}
        </div>

        <div className="history-date">
          {new Date(event.createdAt).toLocaleString()}
        </div>

      </div>

    </div>

  );

}

export default SkuDetailsEvent;