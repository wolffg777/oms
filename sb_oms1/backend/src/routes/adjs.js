const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient.js");

// Inventory Adjustments Table -- Full Crud (no update)

// CREATE ADJ (not connected to Job)
/*
curl -X POST http://localhost:3001/api/adjs \
  -H "Content-Type: application/json" \
  -d '{"name":"Inv2","type":"shipment"}'
*/
router.post("/", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const adj = await prisma.invAdjustment.create({
      data: { name: name, type: type },
    });
    res.status(201).json(adj);
  } catch (err) {
    next(err);
  }
});

// READ ALL ADJS
/*
curl -X GET http://localhost:3001/api/adjs \
-H "Content-Type: application/json"
*/
router.get("/", async (req, res, next) => {
  try {
    const adjs = await prisma.invAdjustment.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(adjs);
  } catch (err) {
    next(err);
  }
});

// READ ADJ FROM ID
// curl -X GET http://localhost:3001/api/adjs/47c9e94b-7aae-4370-9bd6-1f4f3e8ef595
router.get("/:id", async (req, res, next) => {
  try {
    const adj = await prisma.invAdjustment.findUnique({
      where: { id: req.params.id },
    });
    if (!adj) {
      res.status(404).json({ error: "Inventory Adjustment Not Found" });
    } else {
      res.status(200).json(adj);
    }
  } catch (err) {
    next(err);
  }
});

// UPDATES
// not necessary for this table, only will support deleting them in full

// DELETE
// curl -X DELETE http://localhost:3001/api/adjs/9ed1a663-16d7-494c-96f8-141e48d940dd \
// -H "Content-Type: application/json"
router.delete("/:id", async (req, res, next) => {
  try {
    const adj = await prisma.invAdjustment.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
