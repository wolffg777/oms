// Need to instantiate one Prisma client in order to avoid too many clients running at the same time, which will be a problem
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
