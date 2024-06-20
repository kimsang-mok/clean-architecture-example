import { PrismaClient } from "@prisma/client"
import { CreateLogbookUseCase } from "./application/CreateLogbookUseCase"
// import { InMemoryLogbookRepository } from "./infrastructure/InMemoryLogbookRepository"
import { ApiServer } from "./presentation/ApiServer"
import { CreateLogbookController } from "./presentation/CreateLogbookController"
import { PrismaLogbookRepository } from "./infrastructure/PrismaLogbookRepository"
import { GetLogbookController } from "./presentation/GetLogbookController"
import { GetLogbookUseCase } from "./application/GetLogbookUseCase"

export async function main(): Promise<void> {
  const primaClient = new PrismaClient()
  const prismaRepo = new PrismaLogbookRepository(primaClient)

  // const inMemoryRepo = new InMemoryLogbookRepository()

  const createUseCase = new CreateLogbookUseCase(prismaRepo)
  const createController = new CreateLogbookController(createUseCase)

  const getUseCase = new GetLogbookUseCase(prismaRepo)
  const getController = new GetLogbookController(getUseCase)

  await ApiServer.run(3000, createController, getController)
}

main()
