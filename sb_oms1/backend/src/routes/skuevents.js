const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient.js");

// SKU Events APIs
// CREATE SKUE (not connected to Job)
// curl -X POST http://localhost:3001/api/skuevents \
//   -H "Content-Type: application/json" \
//   -d '{"skuId":"c5c3613a-39b1-48a3-b482-c386ae3615ce","adjId":"47c9e94b-7aae-4370-9bd6-1f4f3e8ef595","mod":5}'
router.post("/", async (req, res, next) => {
  try {
    const { skuId, adjId, mod } = req.body;
    const skue = await prisma.skuEvent.create({
      data: { skuId: skuId, adjId: adjId, mod: mod },
    });
    res.status(201).json(skue);
  } catch (err) {
    next(err);
  }
});

// CALCULATE INV
// curl -X GET http://localhost:3001/api/skuevents/allinv \
// -H "Content-Type: application/json"
router.get("/allinv", async (req, res, next) => {
  try {
    const all_skus = await prisma.sku.findMany({
      orderBy: { createdAt: "desc" },
    });
    var skuTots = [];
    // obviously inefficient, just implement groupBy later
    for (const sku of all_skus) {
      const skuevents = await prisma.skuEvent.findMany({
        where: { skuId: sku.id },
      });
      var tot = 0;
      for (const skue of skuevents) {
        tot = tot + skue.mod;
      }
      skuTots.push({ skuId: sku.id, name: sku.name, quantity: tot });
    }
    res.status(200).json(skuTots);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
