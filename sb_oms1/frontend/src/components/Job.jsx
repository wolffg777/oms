import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const styles = {
    card: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      margin: "16px 0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #e5e7eb",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      margin: "0 0 12px",
      color: "#2563eb",
      fontSize: "1.4rem",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      margin: "8px 0",
      borderBottom: "1px solid #f3f4f6",
      paddingBottom: "6px",
    },
    label: {
      fontWeight: "bold",
      color: "#555",
    },
    value: {
      color: "#222",
    },
    status: {
      display: "inline-block",
      marginTop: "12px",
      padding: "6px 12px",
      borderRadius: "20px",
      backgroundColor:
        job.status === "Completed"
          ? "#22c55e"
          : job.status === "In Progress"
          ? "#f59e0b"
          : "#3b82f6",
      color: "#fff",
      fontWeight: "bold",
    },
  };

  const navigate = useNavigate();

  function onClicky(id) {
    navigate(`/jobs/${id}`);
  }

  return (
    <div style={styles.card}>
      <button style={styles.title} onClick={() => onClicky(job.id)}>{job.name}
      </button>

      <div style={styles.row}>
        <span style={styles.label}>Job ID</span>
        <span style={styles.value}>{job.id}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Client</span>
        <span style={styles.value}>{job.client}</span>
      </div>

      <div>
        <span style={styles.status}>{job.status}</span>
      </div>
    </div>
  );
}

export default Job