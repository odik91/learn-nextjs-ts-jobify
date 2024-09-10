/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const data = require('./mock-data.json')

const prisma = new PrismaClient()

const main = async () => {
  const clerkId = 'user_2lh5t7wZks6DIW9DrVrWe588EM4'
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId
    }
  })

  for (const job of jobs) {
    await prisma.job.create({
      data: job
    })
  }
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect()
  process.exit(1)
})