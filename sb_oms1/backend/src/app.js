require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobs");
const skuRoutes = require("./routes/skus");
const adjRoutes = require("./routes/adjs");
const skuEventsRoutes = require("./routes/skuevents");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/skus", skuRoutes);
app.use("/api/adjs", adjRoutes);
app.use("/api/skuevents", skuEventsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
