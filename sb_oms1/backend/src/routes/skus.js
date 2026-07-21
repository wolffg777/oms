const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient.js");

// SKU Table -- full CRUD (no update)

// CREATE SKU
/*
curl -X POST http://localhost:3001/api/skus \
  -H "Content-Type: application/json" \
  -d '{"piece":"Tshirt","size":"YL","color":"Black","brand":"Campa"}'
*/
router.post("/", async (req, res, next) => {
  try {
    const { piece, size, color, brand } = req.body;
    if (!piece || !size || !color || !brand) {
      return res.status(404).json({
        error: "Bad Request: Shape must be piece, size, color, brand",
      });
    }
    // name auto-gen from fields
    // really fragile right now, change later
    const name =
      piece.substring(0, 3) +
      "-" +
      size +
      "-" +
      color.substring(0, 3) +
      "-" +
      brand.substring(0, 3);
    const sku = await prisma.sku.create({
      data: {
        name: name,
        piece: piece,
        size: size,
        color: color,
        brand: brand,
      },
    });
    res.status(201).json(sku);
  } catch (err) {
    next(err);
  }
});

// READ ALL SKUS
/*
curl -X GET http://localhost:3001/api/skus \
-H "Content-Type: application/json"
*/
router.get("/", async (req, res, next) => {
  try {
    const skus = await prisma.sku.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(skus);
  } catch (err) {
    next(err);
  }
});

// READ SKU FROM ID
// curl -X GET http://localhost:3001/api/skus/23c290e8-690a-49c3-88e2-d5cb1ac35865
router.get("/:id", async (req, res, next) => {
  try {
    const sku = await prisma.sku.findUnique({
      where: { id: req.params.id },
    });
    if (!sku) {
      res.status(404).json({ error: "Sku Not Found" });
    } else {
      res.status(200).json(sku);
    }
  } catch (err) {
    next(err);
  }
});

// UPDATES
// not necessary for this table, only will support deleting them in full

// DELETE
// curl -X DELETE http://localhost:3001/api/skus/808fe7d5-a988-4d18-8559-723d1471264e \
// -H "Content-Type: application/json"
router.delete("/:id", async (req, res, next) => {
  try {
    const sku = await prisma.sku.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
