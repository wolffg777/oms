const express = require("express");
const router = express.Router();
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const prisma = require("../prismaClient.js");

// Jobs — full CRUD

// CREATE JOB
/*
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"name":"Job3","client":"Lincoln High School","notes":"Test test test"}'
*/
router.post("/", async (req, res, next) => {
  // create Job row
  try {
    const start_status = "stage1";
    const { name, client, notes } = req.body;
    if (!name || !client || !notes) {
      return res
        .status(400)
        .json({ error: "Bad Request: Shape must be name, client, notes" });
    }
    const job = await prisma.job.create({
      data: { name: name, client: client, status: start_status, notes: notes },
    });
    // create associated JobEvent row
    const event = await prisma.jobEvent.create({
      data: { jobId: job.id, status: start_status },
    });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// READ ALL JOBS
/*
curl -X GET http://localhost:3001/api/jobs \
-H "Content-Type: application/json"
*/
router.get("/", async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    // if no jobs, returns empty which is valid/fine
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

// READ JOB FROM ID
/*
curl -X GET http://localhost:3001/api/jobs/0d3f2d9d-c2f6-47c9-9d7a-7b210c190589
*/
router.get("/:id", async (req, res, next) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
    });
    if (!job) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      res.status(200).json(job);
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE (PUT: FULL UPDATE)
/*
curl -X PUT http://localhost:3001/api/jobs/0d3f2d9d-c2f6-47c9-9d7a-7b210c190589 \
  -H "Content-Type: application/json" \
  -d '{"name":"Job1","client":"Lincoln High School","notes":"Update Test"}'
*/
router.put("/:id", async (req, res, next) => {
  try {
    const { name, client, notes } = req.body;
    if (!name || !client || !notes) {
      return res
        .status(404)
        .json({ error: "Bad Request: Shape must be name, client, notes" });
    }
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: { name: name, client: client, notes: notes },
    });
    // if fails, then it's a bad id, since vars are checked earlier, and update failed returning nothing
    if (!job) {
      res.status(404).json({ error: "User Not Found" });
    } else {
      res.status(200).json(job);
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE STATUS (PATCH)
/*
curl -X PATCH http://localhost:3001/api/jobs/0d3f2d9d-c2f6-47c9-9d7a-7b210c190589 \
  -H "Content-Type: application/json" \
  -d '{"status":"stage1"}'
*/
router.patch("/:id", async (req, res, next) => {
  try {
    // check valid status here, but not doing that yet because I haven't decided what those are
    const { status } = req.body;
    if (!status) {
      return res
        .status(404)
        .json({ error: "Bad Request: Shape must be status" });
    }
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: { status: status },
    });
    // if fails, then it's a bad id, since vars are checked earlier, and update failed returning nothing
    if (!job) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const event = await prisma.jobEvent.create({
      data: { jobId: job.id, status: status },
    });
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE BY ID
/*
curl -X DELETE http://localhost:3001/api/jobs/b998ac28-2b98-47e8-bb72-5d897a4dae95 \
  -H "Content-Type: application/json"
*/

// TEST CREATE
// curl -X POST http://localhost:3001/api/jobs \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Job2","client":"TEST","notes":"Test test test"}'
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await prisma.job.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
