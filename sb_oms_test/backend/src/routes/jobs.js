//Handles job requests 
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/jobs — list all jobs
router.get('/', async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id — get one job with its events
router.get('/:id', async (req, res, next) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: { events: { orderBy: { createdAt: 'desc' } } }
    });
    if (!job) return res.status(404).json({ error: { message: 'Job not found' } });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs — create a job
router.post('/', async (req, res, next) => {
  try {
    const { wse, schoolName, qntrlId, missiveId, paId, amId, edd, notes } = req.body;
    const job = await prisma.job.create({
      data: { wse, schoolName, qntrlId, missiveId, paId, amId, edd, notes }
    });
    // Write creation event
    await prisma.jobEvent.create({
      data: {
        jobId: job.id,
        status: 'UPDATE_ORDER_ITEMS'
      }
    });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// PUT /api/jobs/:id — update job fields
router.put('/:id', async (req, res, next) => {
  try {
    const { wse, schoolName, qntrlId, missiveId, paId, amId, edd, notes } = req.body;
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: { wse, schoolName, qntrlId, missiveId, paId, amId, edd, notes }
    });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/jobs/:id/status — transition status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: { message: 'Job not found' } });

    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: { status }
    });
    // Write transition event
    await prisma.jobEvent.create({
      data: {
        jobId: job.id,
        status,
        // description: `Status changed from ${existing.status} to ${status}`
      }
    });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/jobs/:id — delete a job
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.job.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;